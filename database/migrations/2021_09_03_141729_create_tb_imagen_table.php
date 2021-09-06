<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTbImagenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tb_imagen')) {
            Schema::create('tb_imagen', function (Blueprint $table) {
                $table->bigIncrements('imagen_id');
                $table->unsignedInteger('galeria_id')->default(0)->nullable()->comment('cuando tiene una valor mayor a 1, entonces los campos evento_id y programa_id, será 0 y tipo_proceso 1');
                $table->unsignedInteger('evento_id')->default(0)->nullable()->comment('cuando tiene una valor mayor a 1, entonces los campos galeria_id y programa_id, será 0 y tipo_proceso 2');
                $table->unsignedInteger('programa_id')->default(0)->nullable()->comment('cuando tiene una valor mayor a 1, entonces los campos galeria_id y evento_id, será 0 y tipo_proceso 3');
                $table->unsignedInteger('tipo_proceso')->comment('1 => galeria || 2 => evento || 3 => programa');
                /* Datos para auditoria */
                $table->string('usu_created');
                $table->string('usu_update');
                $table->timestamps();
                $table->ipAddress('ip_visitor');
                $table->boolean('status')->default(true);
            });
            DB::statement("ALTER TABLE tb_imagen ADD src LONGBLOB after tipo_proceso");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_imagen');
    }
}
