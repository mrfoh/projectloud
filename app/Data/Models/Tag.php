<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Tag extends Model {

		protected $fillable = ['name','slug'];

		public function posts() {
	        return $this->morphedByMany('\Bps\Data\Models\Post', 'taggable');
	    }

	    public function categories() {
	    	return $this->morphedByMany('\Bps\Data\Models\Category', 'taggable');
	    }
	}