<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class course extends Model
{
   protected $fillable = [
        'course_name'
    ];

  public function students(){
    return $this->hasMany(Students::class);
  }
  
}
