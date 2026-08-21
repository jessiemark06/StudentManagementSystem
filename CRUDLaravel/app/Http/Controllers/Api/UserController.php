<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password)
      ]);
      return response()->json([
        'message' => "Sign up Successfully",
        'user' => $user
      ], 201);
    }

    public function login(Request $request){
      $credentials = $request->validate([
        'email'=> 'required|email',
        'password'=> 'required'
      ]);

      $user = User::where('email', $credentials['email'])->first();

      if(!$user || !Hash::check($credentials['password'], $user->password) ){
        return response()->json([
          'message'=> 'Invalid email or password.'
        ], 401);
      }
      $token = $user->createToken('auth_token')->plainTextToken;

      return response()->json([
        'message'=> 'Login successful.',
        'user'=> 'token',
        'token'=> $token
      ], 201);
    }
}
