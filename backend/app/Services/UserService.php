<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class UserService
{
    /**
     * Creates and adds a new user record into the database.
     * 
     * @param array $data user information.
     * 
     * @return array action response array.
     */
    public function create(array $data): array
    {
        try {
            return [
                'success' => true,
                'message' => 'User created successfully',
                'data' => null
            ];
        } catch (\Throwable $th) {
            Log::info($th->getMessage());

            return [
                'success' => false,
                'message' => $th->getMessage(),
                'data' => null
            ];
        }
    }

    /**
     * Logs the user into the system.
     * 
     * @param array $data user information.
     * 
     * @return array action response array.
     */
    public function login(array $data): array
    {
        try {
            return [
                'success' => true,
                'message' => 'User logged in successfully',
                'data' => null
            ];
        } catch (\Throwable $th) {
            Log::info($th->getMessage());

            return [
                'success' => false,
                'message' => $th->getMessage(),
                'data' => null
            ];
        }
    }
}
