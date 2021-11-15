<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTbRedSocialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_red_social', function (Blueprint $table) {
            $table->bigIncrements('red_social_id');
            $table->string('descripcion');
            $table->string('icono')->nullable();
            $table->string('color')->nullable();
            $table->text('url')->nullable();
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
        Schema::dropIfExists('tb_red_social');
    }
}
