<?php

namespace App\Http\Middleware;

use Closure;

use App\User;


class passwordConfirmationCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        if ($request->user()) {
            if (!$request->user()->isActivated()) {
                return response()->json(['error' => 'user_not_verified'], 403);
            }
        } else {
            $user = User::where('email', '=', $request->only('login'))->first();
            if ($user !== null && !$user->isActivated()) {
                return response()->json(['error' => 'user_not_verified'], 403);
            }
        }

        return $next($request);
    }
}
