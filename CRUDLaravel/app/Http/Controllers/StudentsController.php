<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;
use App\Models\Course;

class StudentsController extends Controller
{
 
   public function home(){
    return view('index');
   }

   public function display(Request $request){
      
      $student = Students::query();

      if($request->filled('search')){
         $search = $request->search;

         $student->where(function($query) use($search){
            $query->where('first_name', 'like', '%'.$search.'%')
                  ->orWhere('last_name', 'like', '%'.$search.'%')
                  ->orWhere('course', 'like', '%'.$search.'%');
         });
      }
      $students = $student->paginate(10)->withQueryString();

      return view('index', compact('students'));
   
   } 

   public function firstSort(Request $request){
      $student = Students::query();
      
      if($request->filled('firstSort')){
         $student->orderBy($request->firstSort);
      }
      $students = $student->paginate(10)->withQueryString();

      return view('index', compact('students'));
   }
   
   
   public function filter(Request $request){
      $student = Students::query();

      if($request->filled('year')){
         $student->where('year', $request->year);
      }
      $students =$student->paginate(10)->withQueryString();
      return view('index', compact('students'));
   }


   public function add(){
      $courses = Course::all();
      return view('students.add', compact('courses'));

   }

   public function create(Request $request){
      $request->validate([
         'first_name' => 'required|max:50',
         'last_name' => 'required|max:50', 
         'course_id' => 'required|integer',
         'year' =>'required|integer',
         'sex' => 'required|max:50',
         'birthdate' => 'required|max:50',
        'number' => 'required|regex:/^09\d{9}$/',
         'address'=> 'required',
      ]);

      $image = null;
      if($request->hasFile('image')){
         $image = $request->file('image')->store('students', 'public');
      }
      
      Students::create([
         'first_name' => $request->first_name,
         'last_name' => $request->last_name, 
         'course_id' => $request->course_id,
         'year' => $request->year,
         'sex' => $request->sex,
         'birthdate' => $request->birthdate,
         'number' => $request->number,
         'address'=> $request->address,
         'image'=> $image,
      ]);
      return redirect('/'); 

   }

   public function edit($id){
      
      $student = Students::findorfail($id);
      $courses = Course::all();

      return view('students.edit', compact('student', 'courses')); 
   }

   public function update(Request $request, $id){

      $student = Students::findorfail($id);

   if ($request->hasFile('image')) {

         $image = $request->file('image')->store('students', 'public');

         $student->image = $image;
      }

      $student->fill([
         'first_name' => $request->first_name,
         'last_name' => $request->last_name,
         'course_id' => $request->course_id,
         'year' => $request->year,
         'sex' => $request->sex,
         'birthdate' => $request->birthdate,
         'number' => $request->number,
         'address'=> $request->address,
         'image'=> $image,
      ]);

     if(!$student->isDirty()){
       return redirect('/')->with('info', "No changes were made.");
     }

     $student->save();

     return redirect('/')->with('success', "Student updated sucessfully!");
   }

   public function delete($id){
      $student = Students::findorfail($id);

      $student->delete();

      return redirect('/');
   }

   public function view($id){

      $student = Students::findorfail($id);
      
      return view('students.view', compact('student'));
   }

   
}
