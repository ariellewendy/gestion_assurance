<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddContratAssuranceIdToSinistresTable extends Migration
{
    public function up()
    {
        Schema::table('sinistres', function (Blueprint $table) {
            $table->unsignedBigInteger('contrat_assurance_id')->nullable()->after('user_id');
            $table->foreign('contrat_assurance_id')->references('id')->on('contrats_assurance')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('sinistres', function (Blueprint $table) {
            $table->dropForeign(['contrat_assurance_id']);
            $table->dropColumn('contrat_assurance_id');
        });
    }
}
