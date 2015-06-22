<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class UserRole extends Model {

		/**
		 * Fillable atrributes of the model
		 *
		 * @var array
		 */
		protected $fillable = ['user_id','role_id'];

		/**
		 * The database table used by the model.
		 *
		 * @var string
		 */
		protected $table = "user_roles";

		protected $timestamps = false;
	}