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

    public function addcourse(Request $request){

    $course = Course::create([
        'course_name' =>$request->course_name
    ]);
    return response()->json([
        'Message' => 'Course added successfully!',
        'course' => $course
    ],201);
    }
}
