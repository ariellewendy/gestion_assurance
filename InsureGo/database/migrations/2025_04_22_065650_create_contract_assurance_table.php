<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contract_assurance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('numero_police')->unique();
            $table->string('type_assurance');
            $table->date('date_effet');
            $table->date('date_expiration');
            $table->text('description')->nullable();
            $table->decimal('prime', 10, 2);
            $table->string('status')->default('actif');
            $table->json('details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_assurance');
    }
};

