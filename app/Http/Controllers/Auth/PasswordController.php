<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;

class PasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Create a new password controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware($this->guestMiddleware());
    }


    public function postEmail(Request $request)
    {

        $this->validate($request, ['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'), function (Message $message) {
            $message->subject($this->getEmailSubject());
        });

        switch ($response) {
            case Password::RESET_LINK_SENT:
                return response(null, 200);
            case Password::INVALID_USER:
                return response()->json(['error' => 'email_not_found'], 400);
        }
    }

    public function reset(Request $request)
    {

        $this->validate($request, ['email' => 'required|email', 'password' => 'required|min:1', 'token' => 'required']);

        $credentials = $request->only(
            'email', 'password', 'token'
        );

        $credentials['password_confirmation'] = $credentials['password']; //broker requires pass_conf. we are putting it on front app

        $broker = $this->getBroker();

        $response = Password::broker($broker)->reset($credentials, function ($user, $password) {
            //dd($credentials);
            $user->forceFill([
                'password' => bcrypt($password),
                'remember_token' => str_random(60),
            ])->save();
        });

        switch ($response) {
            case Password::PASSWORD_RESET:
                return response(null, 200);

            default:
                return response()->json(['error' => $response], 400);
        }
    }
}
