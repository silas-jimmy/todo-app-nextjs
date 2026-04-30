<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TodoController;
use App\Http\Middleware\UserAuthorization;
use Illuminate\Support\Facades\Route;

Route::prefix('todos')->group(function () {
    Route::middleware([UserAuthorization::class])->group(function () {
        Route::apiResources([
            'todo' => TodoController::class,
            'category' => CategoryController::class,
        ]);
    });
});
