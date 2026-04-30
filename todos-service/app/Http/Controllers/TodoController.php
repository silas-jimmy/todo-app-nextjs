<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => 'Get all todos'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Log::info($request->attributes->get('user_id'));

        return response()->json([
            'message' => 'Add todo'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        // Log::info($todo);

        return response()->json([
            'message' => 'Get todo'
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        return response()->json([
            'message' => 'Update todo'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        return response()->json([
            'message' => 'Delete todo'
        ]);
    }
}
