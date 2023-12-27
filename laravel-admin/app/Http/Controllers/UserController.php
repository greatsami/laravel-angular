<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserController extends Controller
{
    public function index()
    {
        $this->authorize('view', 'users');
        return UserResource::collection(User::with('role')->paginate());
    }

    public function store(UserRequest $request)
    {
        $this->authorize('edit', 'users');
        $user = User::create($request->only('first_name', 'last_name', 'email', 'password', 'role_id'));

        return response(UserResource::make($user), Response::HTTP_CREATED);
    }

    public function show(User $user)
    {
        $this->authorize('view', 'users');
        return UserResource::make($user->load('role'));
    }

    public function update(UserRequest $request, User $user)
    {
        $this->authorize('edit', 'users');
        if (trim($request->password == '')) {
            $data = $request->safe()->except(['password']);
        } else {
            $data = $request->validated();
        }

        $user->update($data);

        return response(UserResource::make($user), Response::HTTP_ACCEPTED);
    }

    public function destroy(User $user)
    {
        $this->authorize('edit', 'users');
        $user->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
