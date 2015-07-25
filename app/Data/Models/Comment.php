<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Comment extends Model {

		protected $fillable = ['post_id','parent_id','user_id','email','name','body','status'];

		public function post() {
			return $this->belongsTo('\Bps\Data\Models\Post');
		}

		public function replies() {
			return $this->hasMany('\Bps\Data\Models\Comment', 'parent_id');
		}

		public function user() {
			return $this->belongsTo('\Bps\Data\Models\User');
		}
	}