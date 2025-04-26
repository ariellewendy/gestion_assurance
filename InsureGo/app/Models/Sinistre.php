<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sinistre extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'police',
        'type_incident',
        'date_sinistre',
        'lieu_sinistre',
        'description',
        'montant_estime',
        'documents',
        'confirmation',
    ];

    protected $casts = [
        'documents' => 'array',
        'confirmation' => 'boolean',
        'date_sinistre' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
