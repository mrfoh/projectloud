<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\SoftDeletes;

	class Post extends Model {

		use SoftDeletes;

		protected $fillable = ['category_id','title','slug','body','status'];

		protected $dates = ['deleted_at'];

		public function tags() {
			return $this->morphToMany('\Bps\Data\Models\Tags', 'tagable');
		}

		public function comments() {
			return $this->hasMany('\Bps\Data\Models\Comment');
		}

		public function scopePublished($query) {
			return $query->where('status','published');
		}

		public function scopeUnpublished($query) {
			return $query->where('status', 'unpublished');
		}

		public function scopeDrafts($query) {
			return $query->where('status', 'draft');
		}
	}