<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateInfoRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'role_id' => 1,
        ]);

        return response(UserResource::make($user), Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response([
                'error' => 'Invalid credentials'
            ], Response::HTTP_UNAUTHORIZED);
        }
        /** @var User $user */
        $user = Auth::user();
        $jwt = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $jwt, 60*24);

        return response([
            'jwt' => $jwt,
        ], Response::HTTP_CREATED)
            ->withCookie($cookie);
    }

    public function user(Request $request)
    {
        return response(UserResource::make($request->user()->load('role')), Response::HTTP_CREATED);
        // if (auth()->check()) {
        //     return response($request->user(), Response::HTTP_CREATED);
        // }
        // return response(['message' => 'no logged user'], Response::HTTP_UNAUTHORIZED);

    }

    public function logout()
    {
        $cookie = cookie()->forget('jwt');

        return response([
            'message' => 'success',
        ], Response::HTTP_NO_CONTENT)
            ->withCookie($cookie);
    }

    public function updateInfo(UpdateInfoRequest $request)
    {
        $user = $request->user();
        $user->update($request->only('first_name', 'last_name', 'email'));

        return response(UserResource::make($user), Response::HTTP_ACCEPTED);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();
        $user->update([
            'password' => $request->input('password')
        ]);

        return response(UserResource::make($user), Response::HTTP_ACCEPTED);
    }

}
