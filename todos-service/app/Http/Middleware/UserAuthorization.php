<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\BeforeValidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class UserAuthorization
{
    /**
     * Handle an incoming request.
     * This middleware checks if the request contains a Bearer token before 
     * parsing the token. Unauthorized (401) response is returned if no token is provided
     * or an error occurs during parsing.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $jwt = $request->bearerToken();

        if ($jwt) {
            try {
                $key = Storage::get('keys/' . env('OAUTH_PUBLIC_KEY_NAME', 'oauth-public.key'));

                $decoded_token = JWT::decode($jwt, new Key($key, env('OAUTH_KEY_SIGNATURE', 'RS256')));

                $user_id = $decoded_token->sub;
                $user_scopes = $decoded_token->scopes;

                $request->attributes->add([
                    'user_id' => $user_id,
                    'scopes' => $user_scopes
                ]);

                return $next($request);
            } catch (\InvalidArgumentException $e) {
                Log::error($e->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Empty or malformed key provided',
                    'data' => $e->getMessage(),
                ], 401);
            } catch (\DomainException $e) {
                Log::error($e->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Unsupported algorithm or invalid key provided',
                    'data' => $e->getMessage(),
                ], 401);
            } catch (SignatureInvalidException $e) {
                Log::error($e->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Token signature verification failed',
                    'data' => $e->getMessage(),
                ], 401);
            } catch (BeforeValidException $e) {
                Log::error($e->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Attempting to use token before nbf or iat',
                    'data' => $e->getMessage(),
                ], 401);
            } catch (ExpiredException $e) {
                Log::error($e->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Expired token',
                    'data' => $e->getMessage(),
                ], 401);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());

                return response()->json([
                    'success' => false,
                    'message' => 'Something is wrong with the provided token',
                    'data' => $th->getMessage(),
                ], 401);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Action unauthorized',
            'data' => null,
        ], 401);
    }
}
