<?php

use App\Http\Controllers\AuthenticationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
    Route::controller(AuthenticationController::class)->group(function () {
        Route::post('/register', 'register')->name('register');

        Route::post('/login', 'login')->name('login');
    });

    Route::middleware('auth:api')->group(function () {
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
    });
});
