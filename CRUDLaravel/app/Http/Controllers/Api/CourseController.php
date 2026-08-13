<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\course;

class CourseController extends Controller
{

    public function course(){
        
    $course = Course::all();

    return response()->json($course);
    }
}
