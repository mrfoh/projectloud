<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Comment extends Model {

		protected $fillable = ['post_id','parent_id','user_id','email','name','body','status'];

		public function post() {
			return $this->belongsTo('\Bps\Data\Models\Post');
		}
	}