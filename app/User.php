<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Laravel\Lumen\Auth\Authorizable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable;

 	protected $table = 'view_users';
	protected $primaryKey = 'us_id';

	/**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'us_password',
    ];
	
	public function menus(){
		return $this->belongsToMany('App\Menu', 'RPT.dbo.RPT_PRIVILEGES', 'obj_id', 'menu_id')->where(['ptype' => 2, 'priv' => 1]);
	}
	
	public function roles($corp){
		return $this->belongsToMany('App\Role', 'RPT.dbo.RPT_USER_ROLE', 'user_id', 'role_id')->where('corp', $corp);
	}
}
