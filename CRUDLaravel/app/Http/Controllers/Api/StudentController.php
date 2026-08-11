<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Students;

class StudentController extends Controller
{
   public function index(){ 

    $students = Students::all();

     return response()->json($students);
    
   }
   public function add(Request $request){
      
      $students = Students::create([
         'first_name'=>$request->first_name,
         'last_name'=>$request->last_name,
         'course_id' => $request->course_id,
         'year' => $request->year,
         'sex' => $request->sex,
         'birthdate' => $request->birthdate,
         'number' => $request->number,
         'address'=> $request->address
      ]);
      return response()->json([
         'message' => 'Student added successfully',
         'student' => $students
      ], 201);
   }
}
