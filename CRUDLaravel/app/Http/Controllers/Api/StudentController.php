<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Students;
use App\Models\course;

class StudentController extends Controller
{
   public function index(Request $request){ 

    $students = Students::with('course');
      
    if($request->filled('search')){ 
      $search = $request->search;

      $students->where(function ($query) use ($search) {

         $query->where('first_name', 'like', '%' . $search . '%')
               ->orWhere('last_name', 'like', '%'. $search . '%')
              
               ->orWherehas('course', function ($courseQuery) use ($search){
                   $courseQuery->where('course_name', 'like', '%' . $search . '%');
                });
      });
    }

    $students = $students->paginate(10)->withQueryString();

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

   public function course(){

      $course = course::all();

      return response()->json($course);
   }

   public function display($id){
      $students = Students::findorfail($id);

      return response()->json($students);
   }

   public function update(Request $request, $id){

      $students = Students::findorfail($id);

      $students->update([
           'first_name'=>$request->first_name,
         'last_name'=>$request->last_name,
         'course_id' => $request->course_id,
         'year' => $request->year,
         'sex' => $request->sex,
         'birthdate' => $request->birthdate,
         'number' => $request->number,
         'address'=> $request->address
      ]);
      return response()->json($students);
   }

   public function delete($id){
      $student = Students::findorfail($id);

      $student->delete();

      return response()->json($student);
   }
}
