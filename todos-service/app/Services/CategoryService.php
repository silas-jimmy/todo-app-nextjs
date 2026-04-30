<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class CategoryService
{
    /**
     * Retrieves all todo categories of the current user from the database.
     * 
     * @param int $userId the current user's ID.
     * 
     * @return array action response.
     */
    public function getAll(int $userId): array
    {
        try {
            $categories = Category::where('user_id', $userId)->get();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo categories retrieved successfully.',
                'data' => $categories
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return [
                'success' => false,
                'code' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'data' => $th->getMessage()
            ];
        }
    }

    /**
     * Retrieves a single todo category record using the specified ID from the database.
     * 
     * @param int $userId the current user's ID.
     * @param int $categoryId the ID of the category to retrieve.
     * 
     * @return array action response.
     */
    public function getOne(int $userId, int $categoryId): array
    {
        try {
            $category = Category::where([
                'id' => $categoryId,
                'user_id' => $userId,
            ])->firstOrFail();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo category retrieved successfully.',
                'data' => $category
            ];
        } catch (ModelNotFoundException $e) {
            Log::error($e->getMessage());

            return [
                'success' => false,
                'code' => 404,
                'message' => 'Record not found.',
                'data' => $e->getMessage()
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return [
                'success' => false,
                'code' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'data' => $th->getMessage()
            ];
        }
    }

    /**
     * Adds a new category record to the database.
     * 
     * @param int $userId the current user's ID.
     * @param array $data the payload containing the todo category information.
     * 
     * @return array action response.
     */
    public function create(int $userId, array $data): array
    {
        try {
            $category = Category::create([
                'label' => $data['label'],
                'value' => $data['value'],
                'description' => Arr::get($data, 'description'),
                'user_id' => $userId
            ]);

            return [
                'success' => true,
                'code' => 201,
                'message' => 'Todo category created successfully.',
                'data' => $category
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return [
                'success' => false,
                'code' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'data' => $th->getMessage()
            ];
        }
    }

    /**
     * Updates an existing todo category record in the database.
     * 
     * @param Category $category the ID of the category to update.
     * @param array $data the payload containing the todo category information.
     * 
     * @return array action response.
     */
    public function update(Category $category, array $data): array
    {
        try {
            $category->update([
                'label' => Arr::get($data, 'label'),
                'value' => Arr::get($data, 'value'),
                'description' => Arr::get($data, 'description'),
            ]);

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo category updated successfully.',
                'data' => $category
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return [
                'success' => false,
                'code' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'data' => $th->getMessage()
            ];
        }
    }

    /**
     * Deletes an existing todo category record from the database.
     * 
     * @param Category $category the ID of the category to delete.
     * 
     * @return array action response.
     */
    public function delete(Category $category): array
    {
        try {
            $category->delete();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo category deleted successfully',
                'data' => null
            ];
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return [
                'success' => false,
                'code' => 500,
                'message' => 'Something went wrong. Please try again later.',
                'data' => $th->getMessage()
            ];
        }
    }
}
