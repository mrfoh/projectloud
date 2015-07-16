<?php namespace Bps\Data\Models;

	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\SoftDeletes;

	class File extends Model {

		use SoftDeletes;

		protected $fillable = ['user_id','disk','src','name','mime','size'];

		public function posts() {
			return $this->morphedByMany('\Bps\Data\Model\Post', 'fileable');
		}
		public function uploader() {
			return $this->belongsTo('\Bps\Data\Model\User');
		}
	}