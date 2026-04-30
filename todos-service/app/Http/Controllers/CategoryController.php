<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    /**
     * Inject service classes to the controller.
     * 
     * @return void
     */
    public function __construct(
        protected CategoryService $categoryService,
    ) {}

    /**
     * Retrieve all todo categories of the current user.
     * 
     * @param Request $request user's request.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function index(Request $request): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->categoryService->getAll($user_id);

        return response()->json($response, $response['code']);
    }

    /**
     * Create and save a new todo category.
     * 
     * @param Request $request user's request.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'label' => 'bail|string|required|unique:categories|max:15',
            'value' => 'bail|string|required|unique:categories|max:15',
            'description' => 'bail|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'code' => 422,
                'message' => 'Failed to create todo category!',
                'data' => $validator->errors(),
            ], 422);
        }

        $user_id = $request->attributes->get('user_id');

        $response = $this->categoryService->create($user_id, $request->all());

        return response()->json($response, $response['code']);
    }

    /**
     * Retrieve a todo category by the specified ID.
     * 
     * @param Request $request user's request.
     * @param int $id the category ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function show(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->categoryService->getOne($user_id, $id);

        return response()->json($response, $response['code']);
    }

    /**
     * Update the todo category by the specified ID.
     * 
     * @param Request $request user's request.
     * @param int $id the category ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->categoryService->getOne($user_id, $id);

        if ($response['success']) {
            $category = $response['data'];

            $validator = Validator::make($request->all(), [
                'label' => ['bail', 'string', 'required', Rule::unique('categories')->ignore($category->id), 'max:15'],
                'value' => ['bail', 'string', 'required', Rule::unique('categories')->ignore($category->id), 'max:15'],
                'description' => 'bail|string|max:255'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'code' => 422,
                    'message' => 'Failed to update todo category!',
                    'data' => $validator->errors(),
                ], 422);
            }

            $response = $this->categoryService->update($category, $request->all());

            return response()->json($response, $response['code']);
        }

        return response()->json($response, $response['code']);
    }

    /**
     * Delete a todo category by the specified ID from the database.
     * 
     * @param Request $request user's request.
     * @param int $id the category ID.
     * 
     * @return JsonResponse JSON object containing the action response and status code.
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user_id = $request->attributes->get('user_id');

        $response = $this->categoryService->getOne($user_id, $id);

        if ($response['success']) {
            $category = $response['data'];

            $response = $this->categoryService->delete($category);

            return response()->json($response, $response['code']);
        }

        return response()->json($response, $response['code']);
    }
}
