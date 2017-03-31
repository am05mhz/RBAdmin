<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Login extends Controller
{

    public function __construct(){
        //
    }

	public function index(){
		return view('login');
	}
	
	public function authenticate(Request $req){
		$goto = '/login';
		$err = true;
		$data = $req->only('username', 'password');
		$user = \App\User::where('us_username', $data['username'])->first();
		if ($user){
			$pwd = strtoupper(md5($data['password'] . $user->us_salt));
			if ($pwd == $user->us_password){
				$userauth = $user->menus()->where('menu', 'like', 'SPK%')->first();
				$roleauth = $user->roles('MBP')->first()->menus()->where('menu', 'like', 'SPK%')->first();
				if ($userauth or $roleauth){
					$_SESSION['user'] = $user;
					$goto = '/';
					$err = false;
				}
			}
		}
		if ($req->ajax()){
			if ($err){
				return ['error' => 'Cannot find user with the specified data'];
			} else {
				return ['success' => true, 'redirectTo' => url($goto)];
			}
		} else {
			return redirect($goto);
		}
	}
	
	public function logout(Request $req){
		session_destroy();
		if ($req->ajax()){
			return ['success' => true, 'redirectTo' => url('/login')];
		} else {
			return redirect('/login');
		}
	}
	
}
