<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Factory as Auth;

class SessionStart
{
    /**
     * The authentication guard factory instance.
     *
     * @var \Illuminate\Contracts\Auth\Factory
     */
    protected $auth;

    public function __construct(Auth $auth)
    {
		if (\PHP_SESSION_ACTIVE !== session_status()){
			session_start();
		}
		$this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {

        return $next($request);
    }
}
