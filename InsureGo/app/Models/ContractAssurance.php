<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContratAssurance extends Model
{
    protected $table = 'contrat_assurance`';
    use HasFactory;

    protected $fillable = [
        'user_id',
        'numero_police',
        'type_assurance',
        'date_effet',
        'date_expiration',
        'description',
        'prime',
        'status',
        'details',
    ];

    protected $casts = [
        'details' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sinistres()
    {
        return $this->hasMany(Sinistre::class);
    }
}
