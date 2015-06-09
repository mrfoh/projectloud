<?php namespace Bps\Data\Models;
	
	use Illuminate\Database\Eloquent\Model;

	class Tag extends Model {

		protected $fillable = ['name','slug','tagable_id','tagable_type'];

		public function tagable() {
			return $this->morphTo();
		}
	}