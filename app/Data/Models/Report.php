<?php namespace Bps\Data\Models;

	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\SoftDeletes;

	class Report extends Model {

		protected $fillable = ['user_id','type','comment','status'];

		public function reportable() {
			return $this->morphTo();
		}

		public function user() {
			return $this->belongsTo('\Bps\Data\Models\User');
		}
	}