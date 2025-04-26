<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema; 

return new class extends Migration
{
    /**
     * Run the migrations. voila
     */  
    public function up(): void
    {
        Schema::create('sinistres', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->constrained->onDelete('cascade');
            $table->unsignedBigInteger('user_id'); 
            $table->string('police'); 
            $table->string('type_incident'); 
            $table->date('date_sinistre');
            $table->string('lieu_sinistre');
            $table->text('description');
            $table->decimal('montant_estime', 10, 2);
            $table->json('documents')->nullable(); 
            $table->boolean('confirmation'); 
          
            $table->text('description');

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('sinistres');
    }
};
