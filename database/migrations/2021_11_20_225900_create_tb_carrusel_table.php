<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateTbCarruselTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('tb_carrusel')) {
            Schema::create('tb_carrusel', function (Blueprint $table) {
                $table->bigIncrements('carrusel_id');
                /* Datos para auditoria */
                $table->string('usu_created');
                $table->string('usu_update');
                $table->timestamps();
                $table->ipAddress('ip_visitor');
                $table->boolean('status')->default(true);
            });
            DB::statement("ALTER TABLE tb_carrusel ADD src LONGBLOB after carrusel_id");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_carrusel');
    }
}
