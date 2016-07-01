<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use App\Http\Requests;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;

use Mail;


class AuthenticateController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['authenticate', 'register', 'verify', 'resetPassword']]);
        $this->middleware('passwordConfirmationCheck', ['except' => ['register', 'verify', 'resetPassword']]);
    }

    public function register(Request $request)
    {

        $newuser = $request->only('name', 'email', 'password');

        if (User::where('email', $newuser['email'])->exists()) {
            return response()->json(['error' => 'user_already_exists'], 409);
        }

        $password = Hash::make($request->input('password'));

        $newuser['password'] = $password;
        $confirmation_code = str_random(30);
        $newuser['confirmation_code'] = $confirmation_code;

        try {
            User::create($newuser);
        } catch (\Exception $e) {
            return response()->json(['error' => 'could_not_create_user'], 500);
        }

        Mail::send('emails.verify', ['confirmation_code' => $confirmation_code], function ($message) use ($newuser) {
            $message->from('jwt_auth@app.com', 'JWT Auth')
                ->to($newuser['email'], $newuser['name'])
                ->subject('Verify your email address');
        });

        return response(null, 200);
    }

    public function verify(Request $request)
    {
        $confirmationCode = $request->only('confirmationcode');
        if (!$confirmationCode) {
            return response()->json(['error' => 'confirmation_code_needed'], 400);
        }

        $user = User::whereConfirmationCode($confirmationCode)->first();

        if (!$user) {
            return response()->json(['error' => 'invalid_confirmation_code'], 400);
        }

        $user->confirmed = 1;
        $user->confirmation_code = null;
        $user->save();

        return response(null, 200);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

}
