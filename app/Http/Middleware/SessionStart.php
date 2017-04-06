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
		if (config('session.driver') == 'php'){
			if (\PHP_SESSION_ACTIVE !== session_status()){
				session_start();
			}
		}
		if (config('session.driver') == 'memcache'){
			$mcon = config('session.connection');
			$exp = config('session.expire');

			$session_id = array_key_exists($mcon['session_name'], $_COOKIE) ? $_COOKIE[$mcon['session_name']] : '';
			if (! $session_id){
				$d = new \DateTime();
				$session_id = str_replace(['$2y$10$', '/', '#', '?', '&', '$'], '', bcrypt($d->format('Y-m-d H:i:s')));
				@setcookie($mcon['session_name'], $session_id, time() + $exp * 60);

				$mcache = new \Memcache();
				$mcache->connect($mcon['host'], $mcon['port']);
				
				$mcache->set($session_id, ['user' => ''], false, $exp * 60);
			}
			
		}
		$this->auth = $auth;
    }

    public function handle($request, Closure $next, $guard = null)
    {
        return $next($request);
    }
}
