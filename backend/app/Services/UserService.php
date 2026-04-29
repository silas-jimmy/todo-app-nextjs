<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            return [
                'success' => true,
                'message' => 'User account created successfully',
                'data' => $user
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
            $user = User::firstWhere('email', $data['email']);

            $remember = Arr::get($data, 'remember') ? true : false;
            $credentials = [
                'email' => $data['email'],
                'password' => $data['password']
            ];

            if (Auth::attempt($credentials, $remember)) {
                $token = $user->createToken('api token')->plainTextToken;
                
                return [
                    'success' => true,
                    'message' => 'User logged in successfully',
                    'data' => $token
                ];
            }

            return [
                'success' => false,
                'message' => 'Failed to login!',
                'data' => [
                    'password' => ['Incorrect password.']
                ]
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
