<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatutToSinistresTable extends Migration
{
    public function up()
    {
        Schema::table('sinistres', function (Blueprint $table) {
            $table->string('statut')->default('en_cours_de_traitement')->in(['en_cours_de_traitement', 'accepte', 'rejete']);
        });
    }

    public function down()
    {
        Schema::table('sinistres', function (Blueprint $table) {
            $table->dropColumn('statut');
        });
    }
}