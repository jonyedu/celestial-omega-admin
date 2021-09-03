<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTbEventoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tb_evento')) {
            Schema::create('tb_evento', function (Blueprint $table) {
                $table->bigIncrements('evento_id');
                $table->date('fecha');
                $table->time('hora');
                $table->string('titulo', 30);
                $table->string('sub_titulo', 100);
                $table->unsignedInteger('flex')->default(6);
                //$table->binary('src');
                /* Datos para auditoria */
                $table->string('usu_created');
                $table->string('usu_update');
                $table->timestamps();
                $table->string('ip_address', 45)->nullable()->default('192.168.1.196');
                $table->boolean('status')->default(true);
            });
            //DB::statement("ALTER TABLE tb_evento ADD src LONGBLOB after flex");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_evento');
    }
}
