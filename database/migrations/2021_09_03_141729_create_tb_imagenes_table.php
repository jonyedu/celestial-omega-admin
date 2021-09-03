<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTbImagenesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tb_imagenes')) {
            Schema::create('tb_imagenes', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->bigIncrements('galeria_id')->default(0)->nullable();
                $table->bigIncrements('evento_id')->default(0)->nullable();
                $table->bigIncrements('programa_id')->default(0)->nullable();
                $table->unsignedInteger('tipo_proceso')->comment('1 => galeria || 2 => evento || 3 => programa');
                /* Datos para auditoria */
                $table->string('usu_created');
                $table->string('usu_update');
                $table->timestamps();
                $table->ipAddress('ip_visitor');
                $table->boolean('status')->default(true);
            });
        }
        DB::statement("ALTER TABLE tb_imagenes ADD ruta_img LONGBLOB after tipo_proceso");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_imagenes');
    }
}
