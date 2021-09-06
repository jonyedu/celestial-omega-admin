<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreateTbProgramaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tb_programa')) {
            Schema::create('tb_programa', function (Blueprint $table) {
                $table->bigIncrements('programa_id');
                $table->date('fecha');
                $table->time('hora_inicio');
                $table->time('hora_fin');
                $table->string('titulo', 30);
                $table->string('sub_titulo', 100);
                $table->unsignedInteger('flex')->default(6);
                /* Datos para auditoria */
                $table->string('usu_created');
                $table->string('usu_update');
                $table->timestamps();
                $table->ipAddress('ip_visitor');
                $table->boolean('status')->default(true);
            });
            DB::statement("ALTER TABLE tb_programa ADD src LONGBLOB after flex");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_programa');
    }
}
