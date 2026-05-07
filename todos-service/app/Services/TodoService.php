<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Todo;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class TodoService
{
    /**
     * Retrieves all todo tasks of the current user from the database.
     * 
     * @param int $userId the current user's ID.
     * 
     * @return array action response.
     */
    public function getAll(int $userId): array
    {
        try {
            $todos = Todo::where('user_id', $userId)->get();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo tasks retrieved successfully.',
                'data' => $todos
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
     * Retrieves a single todo task record using the specified ID from the database.
     * 
     * @param int $userId the current user's ID.
     * @param int $todoId the ID of the todo to retrieve.
     * 
     * @return array action response.
     */
    public function getOne(int $userId, int $todoId): array
    {
        try {
            $todo = Todo::where([
                'id' => $todoId,
                'user_id' => $userId,
            ])->firstOrFail();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo task retrieved successfully.',
                'data' => $todo
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
     * Adds a new todo record to the database.
     * 
     * @param int $userId the current user's ID.
     * @param array $data the payload containing the todo task information.
     * 
     * @return array action response.
     */
    public function create(int $userId, array $data): array
    {
        try {
            $todo = new Todo([
                'title' => $data['title'],
                'description' => Arr::get($data, 'description'),
                'date' => $data['date'],
                'time' => $data['time'],
                'user_id' => $userId
            ]);

            $categoryId = Arr::get($data, 'category_id');

            if ($categoryId) {
                $category = Category::find($categoryId);

                $todo->category()->associate($category);
            }

            $todo->save();

            return [
                'success' => true,
                'code' => 201,
                'message' => 'Todo task created successfully.',
                'data' => $todo
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
     * Updates an existing todo task record in the database.
     * 
     * @param Todo $todo the ID of the todo task to update.
     * @param array $data the payload containing the todo task information.
     * 
     * @return array action response.
     */
    public function update(Todo $todo, array $data): array
    {
        try {
            $todo->update([
                'title' => Arr::get($data, 'title'),
                'description' => Arr::get($data, 'description'),
                'date' => Arr::get($data, 'date'),
                'time' => Arr::get($data, 'time'),
            ]);

            $categoryId = Arr::get($data, 'category_id');

            if ($categoryId) {
                $category = Category::find($categoryId);

                $todo->category()->disassociate();
                $todo->category()->associate($category);

                $todo->save();
            }

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo task updated successfully.',
                'data' => $todo
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
     * Deletes an existing todo task record from the database.
     * 
     * @param Todo $todo the ID of the todo task to delete.
     * 
     * @return array action response.
     */
    public function delete(Todo $todo): array
    {
        try {
            $todo->delete();

            return [
                'success' => true,
                'code' => 200,
                'message' => 'Todo task deleted successfully.',
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
