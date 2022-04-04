<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function register(Request $request) {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password' => 'required|min:3|confirmed',
        ]);
        if ($v->fails()) {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->age = $request->edad;
        $user->password = Hash::make($request->password);
        $user->save();
        return response()->json(['status' => 'succes'], 200);
    }

    public function login(Request $request) {
        $user = User::where('email', '=', $request->email)->get();

        if ($token = $this->guard()->attempt($credentials)) {
            return response()->json(
                ['status' => 'success', 'data' => ['token' => $token],
                'user' => Auth::user()], 200)
                ->header('Authorization', $token);
        } else {
        return 'Error: Usuario erroneo';
        }
    }

    public function logout() {
        $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Cerrado satisfactoriamente.'
        ], 200);
    }

    public function user(Request $request) {
        $user = User::find(Auth::user()->id);
        $user->permisos = UserRoles::find($user->user_rol_id);
        return response()->json([
            'status' => 'success',
            'msg' => 'Abierto satisfactoriamente.',
            'data' => $user
        ]);
    }

    public function refresh() {
        if ($token = $this->guard()->refresh()) {
            return response()
            ->json(['status' => 'success', 'data' => ['token' => $token]],200)
            ->header('Authorization', $token);
        }
        return response()->json(['error' => 'refresh_token_error'], 401);
    }

    private function guard() {
        return Auth::guard();
    }
}
