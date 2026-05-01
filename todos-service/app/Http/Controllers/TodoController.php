<?php

namespace App\Http\Controllers;

use App\Services\TodoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Injects service classes to the controller.
     * 
     * @return void
     */
    public function __construct(
        protected TodoService $todoService,
    ) {}

    /**
     * Retrieve all todo tasks of the current user.
     * 
     * @param Request $request user's request.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function index(Request $request): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->todoService->getAll($user_id);

        return response()->json($response, $response['code']);
    }

    /**
     * Create and save a new todo task.
     * 
     * @param Request $request user's request.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'bail|required|string|max:50',
            'description' => 'bail|string|max:255',
            'date' => 'bail|required|date_format:Y-m-d', // yyyy-mm-dd format
            'time' => 'bail|required|date_format:H:i', // 24-hour format
            'category_id' => 'bail|integer|exists:categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 422,
                'message' => 'Failed to create todo task!',
                'data' => $validator->errors(),
            ], 422);
        }

        $user_id = $request->attributes->get('user_id');

        $response = $this->todoService->create($user_id, $request->all());

        return response()->json($response, $response['code']);
    }

    /**
     * Retrieve a todo task by the specified ID.
     * 
     * @param Request $request user's request.
     * @param int $id the todo task ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->todoService->getOne($user_id, $id);

        return response()->json($response, $response['code']);
    }

    /**
     * Update the todo task by the specified ID.
     * 
     * @param Request $request user's request.
     * @param int $id the todo task ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->todoService->getOne($user_id, $id);

        if ($response['success']) {
            $todo = $response['data'];

            $validator = Validator::make($request->all(), [
                'title' => 'bail|required|string|max:50',
                'description' => 'bail|string|max:255',
                'date' => 'bail|required|date_format:Y-m-d', // yyyy-mm-dd format
                'time' => 'bail|required|date_format:H:i', // 24-hour format
                'category_id' => 'bail|integer|exists:categories,id',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'code' => 422,
                    'message' => 'Failed to update todo task!',
                    'data' => $validator->errors(),
                ], 422);
            }

            $response = $this->todoService->update($todo, $request->all());

            return response()->json($response, $response['code']);
        }

        return response()->json($response, $response['code']);
    }

    /**
     * Delete a todo task by the specified ID from the database.
     * 
     * @param Request $request user's request.
     * @param int $id the todo task ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->todoService->getOne($user_id, $id);

        if ($response['success']) {
            $category = $response['data'];

            $response = $this->todoService->delete($category);

            return response()->json($response, $response['code']);
        }

        return response()->json($response, $response['code']);
    }
}
