<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Role extends Model {
		/**
		 * Fillable atrributes of the model
		 *
		 * @var array
		*/
		protected $fillable = ['name','slug','permissions'];

		public function users() {
			return $this->belongsToMany('\Bps\Data\Models\User');
		}
	}