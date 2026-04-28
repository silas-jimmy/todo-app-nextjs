<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Injects service classes to the controller class.
     * 
     * @param UserService $userService the user service class.
     * 
     * @return void
     */
    public function __construct(
        protected UserService $userService,
    ) {}

    /**
     * Register a new user.
     * 
     * @param Request $request the user request object.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'bail|string|required|max:15',
            'last_name' => 'bail|string|required|max:15',
            'username' => 'bail|string|required|unique:users|max:20',
            'email' => 'bail|string|required|email|unique:users',
            'password' => 'bail|string|required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to register!',
                'data' => $validator->errors(),
            ], 422);
        }

        $response = $this->userService->create($request->all());

        if ($response['success']) {
            return response()->json($response, 201);
        } else {
            return response()->json($response, 422);
        }
    }

    /**
     * Logs in a user.
     * 
     * @param Request $request the user request object.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'bail|required|email|exists:users,email',
            'password' => 'bail|required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to login!',
                'data' => $validator->errors(),
            ], 422);
        }

        $response = $this->userService->login($request->all());

        if ($response['success']) {
            return response()->json($response, 200);
        } else {
            return response()->json($response, 401);
        }
    }
}
