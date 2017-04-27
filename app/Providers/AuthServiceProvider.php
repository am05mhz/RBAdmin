<?php

namespace App\Providers;

use App\User;
use App\Role;
use App\Privilege;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        $this->app['auth']->viaRequest('api', function ($req) {
			if (config('session.driver') == 'php'){
				if (isset($_SESSION['user'])){
					return $_SESSION['user'];
				}
			}
			if (config('session.driver') == 'memcache'){
				$mcon = config('session.connection');
				$exp = config('session.expire');
				
				$mcache = new \Memcache();
				$mcache->connect($mcon['host'], $mcon['port']);
				
				$session_id = $_COOKIE[$mcon['session_name']];
				if ($session_id){
					@setcookie($mcon['session_name'], $session_id, time() + $exp * 30);
					$sess = $mcache->get($session_id);
					if ($sess){
						$mcache->replace($session_id, $sess, false, $exp * 60);
						
						if ($sess['user']){
							return $sess['user'];
						}
					}
				}
			}
        });
		
		Gate::define('add-rules', function ($user) {
			$roleauth = $user->roles('MBP')->first()->menus()->where('menu', 'Mikrotik Add/Edit Rules')->first();
			$userauth = $user->menus()->where('menu', 'Mikrotik Add/Edit Rules')->first();
			if ($roleauth or $userauth) {
				return true;
			}
			return false;
		});
		
		Gate::define('edit-rules', function ($user) {
			$roleauth = $user->roles('MBP')->first()->menus()->where('menu', 'Mikrotik Add/Edit Rules')->first();
			$userauth = $user->menus()->where('menu', 'Mikrotik Add/Edit Rules')->first();
			if ($roleauth or $userauth) {
				return true;
			}
			return false;
		});
		
		Gate::define('delete-rules', function ($user) {
			$roleauth = $user->roles('MBP')->first()->menus()->where('menu', 'Mikrotik Delete Rules')->first();
			$userauth = $user->menus()->where('menu', 'Mikrotik Delete Rules')->first();
			if ($roleauth or $userauth) {
				return true;
			}
			return false;
		});
		
	}
}
