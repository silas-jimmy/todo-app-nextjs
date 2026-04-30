<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;

Route::prefix('todos')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::apiResources([
            'todo' => TodoController::class,
            'category' => CategoryController::class,
        ]);
    });
});
