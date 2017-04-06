<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
	protected $table = 'RPT.dbo.RPT_ROLES';
	protected $primaryKey = 'role_id';

	public function menus(){
		return $this->belongsToMany('App\Menu', 'RPT.dbo.RPT_PRIVILEGES', 'obj_id', 'menu_id')->where(['ptype' => 1, 'priv' => 1]);
	}
	
	public function users($corp){
		return $this->belongsToMany('App\User', 'RPT.dbo.RPT_USER_ROLE', 'role_id', 'user_id')->where('corp', $corp);
	}
}
