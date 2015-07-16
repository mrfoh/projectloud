<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Category extends Model {

		protected $fillable = ['name','slug','description','keywords'];

		protected $hidden = ['created_at', 'updated_at'];

		public function tags() {
			return $this->morphToMany('\Bps\Data\Models\Tag', 'taggable');
		}

		public function posts() {
			return $this->hasMany('\Bps\Data\Models\Post');
		}
	}