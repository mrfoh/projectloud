<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\SoftDeletes;

	class Post extends Model {

		use SoftDeletes;

		protected $fillable = ['category_id','title','slug','body','status'];

		protected $dates = ['deleted_at'];

		public function author() {
			return $this->belongsTo('\Bps\Data\Models\User', 'user_id');
		}

		public function tags() {
			return $this->morphToMany('\Bps\Data\Models\Tag', 'taggable');
		}

		public function category() {
			return $this->belongsTo('\Bps\Data\Models\Category');
		}

		public function featured_image() {
			return $this->morphToMany('\Bps\Data\Models\File', 'fileable');
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