<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Galeria\Galeria;
use App\Models\Imagen\Imagen;
use Exception;
use Collection;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDashboard()
    {
        try {

            $stats = [];
            $charts = [];
            $anio = (int) date('Y');

            $dateS = new Carbon('first day of January' . $anio); // Año actual
            $dateE = new Carbon('first day of December ' . ($anio + 1)); // Año superior

            $imagenes = Imagen::select(
                'tipo_proceso',
                'created_at',
            )

                ->whereBetween('created_at', [$dateS->format('Y-m-d') . " 00:00:00", $dateE->format('Y-m-d') . " 23:59:59"])
                ->where('status', true)
                //->orderBy('created_at', 'DESC')
                ->get();
            //return response()->json(['imagenes' => $imagenes]);

            //Esto es para mostrar en el stats
            $imagenes_stats = $imagenes->groupBy('tipo_proceso');
            foreach ($imagenes_stats as $key => $imagen) {

                $objecto = (object) [];
                $objecto->actionIcon = $key == 1 ? 'mdi-alert' : ($key == 2 ? 'mdi-tag' : 'mdi-calendar-range');
                $objecto->actionText = $key == 1 ? 'Total de Galería en el Año' : ($key == 2 ? 'Total de Evento en el Año' : 'Total de Programa en el Año');
                $objecto->color = $key == 1 ? '#FD9A13' : ($key == 2 ? 'primary' : 'success');
                $objecto->icon = $key == 1 ? 'mdi-image-album' : ($key == 2 ? 'mdi-calendar-blank' : 'mdi-calendar-clock');
                $objecto->title = $key == 1 ? 'Galería' : ($key == 2 ? 'Evento' : 'Programa');
                $objecto->value = (string) count($imagen);

                array_push($stats, $objecto);
            }

            //Esto es para mostrar en el charts
            /* $imagenes_charts = $imagenes->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('m');
            }); */
            $imagenes_charts = $imagenes->groupBy([
                'tipo_proceso',
                function ($item) {
                    return Carbon::parse($item['created_at'])->format('m');
                    return $item['roles'];
                },
            ]);
            //return response()->json(['imagenes_charts' => $imagenes_charts,]);
            foreach ($imagenes_charts as $key => $tipos) {
                $label = [];
                $series = [];
                foreach ($tipos as $llave => $mes) {
                    array_push($label, $llave);
                    array_push($series, count($mes));
                }
                $objecto = (object) [];
                $objecto->type = 'Bar';
                $objecto->color = $key == 1 ? '#FD9A13' : ($key == 2 ? 'primary' : 'success');
                $objecto->title = $key == 1 ? 'Galería' : ($key == 2 ? 'Evento' : 'Programa');
                $objecto->subtitle = 'Detalle por mes';
                $objecto->time = 'Actualizado cada mes';
                $objecto->data = (object) [
                    'labels' => $label,
                    'series' =>  [$series],
                ];
                $objecto->options = (object) [
                    'axisX' => (object) [
                        'showGrid' => false
                    ],
                    'low' => 0,
                    'high' => max($series),
                    'chartPadding' => (object) [
                        'top' => 0,
                        'right' => 5,
                        'bottom' => 0,
                        'left' => 0,
                    ]
                ];
                $objecto->responsiveOptions = [
                    'screen and (max-width: 640px)', (object)[
                        'seriesBarDistance' => 5,
                        'axisX' => (object) [
                            /* 'labelInterpolationFnc' => function (value){
                                return value[0];
                            } */]
                    ]
                ];

                array_push($charts, $objecto);
            }

            return response()->json(['stats' => $stats, 'charts' => $charts]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
