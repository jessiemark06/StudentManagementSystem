<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudentController;

Route::get('/students', [StudentController::class, 'index']);

Route::post('/students', [StudentController::class, 'add']);

Route::get('/courses', [StudentController::class, 'course']);

Route::get('/students/{id}', [StudentController::class, 'display']);

Route::put('/students/{id}', [StudentController::class, 'update']);

Route::delete('/students/{id}', [StudentController::class, 'delete']);