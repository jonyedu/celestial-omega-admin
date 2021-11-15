<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTbLiveTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_live', function (Blueprint $table) {
            $table->bigIncrements('live_id');
            $table->integer('red_social_id')->nullable()->default(0);
            $table->date('fecha');
            $table->time('hora');
            $table->string('nombre')->nullable();
            $table->string('descripcion')->nullable();
            $table->text('url');
            /* Datos para auditoria */
            $table->string('usu_created');
            $table->string('usu_update');
            $table->timestamps();
            $table->ipAddress('ip_visitor');
            $table->boolean('status')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_live');
    }
}
