<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContratAssurance extends Model
{
    use HasFactory;

    protected $table = 'contract_assurance';

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
        'client_id',
    ];

    protected $casts = [
        'details' => 'array',
    ];


    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }
 

    public function agent()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function sinistres()
    {
        return $this->hasMany(Sinistre::class);
    }
}
