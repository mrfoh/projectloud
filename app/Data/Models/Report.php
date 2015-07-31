<?php namespace Bps\Data\Models;

	use Illuminate\Database\Eloquent\Model;
	use Illuminate\Database\Eloquent\SoftDeletes;

	class Report extends Model {

		protected $fillable = ['id','user_id','comment','status', 'reportable_id','reportable_type'];
	}