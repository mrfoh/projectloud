<?php namespace Bps\Data\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Bps\Data\Traits\AccessControl as ACL;

class User extends Model implements AuthenticatableContract, CanResetPasswordContract {

	use Authenticatable, CanResetPassword, ACL;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name', 'email', 'password','provider_id','access_token','username','activation_token','active'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['remember_token'];

	public function getSettingsAttribute($value)
    {
        return json_decode($value);
    }

    public function setSettingsAttribute($value)
    {
        $this->attributes['settings'] = json_encode($value);
    }

	public function roles() {
		return $this->belongsToMany('\Bps\Data\Models\Role', 'user_roles');
	}

	public function posts() {
		return $this->hasMany('\Bps\Data\Models\Post');
	}

	public function comments() {
		return $this->hasMany('\Bps\Data\Models\Comment');
	}

	public function reports() {
		return $this->hasMany('\Bps\Data\Models\Report');
	}

}
