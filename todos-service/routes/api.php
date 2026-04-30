<?php

use Illuminate\Support\Facades\Route;

Route::prefix('todos')->group(function () {
    Route::get('/', function () {
        return "Todos";
    });
});
