<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\UserController;

Route::get('/students', [StudentController::class, 'index']);

Route::post('/students', [StudentController::class, 'add']);

Route::get('/courses', [CourseController::class, 'course']);

Route::get('/students/{id}', [StudentController::class, 'display']);

Route::put('/students/{id}', [StudentController::class, 'update']);

Route::delete('/students/{id}', [StudentController::class, 'delete']);

Route::post('/register', [UserController::class, 'store']);