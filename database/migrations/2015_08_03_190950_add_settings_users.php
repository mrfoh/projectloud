<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSettingsUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		$settings = [
			'replies' => 1,
			'approvals' => 1,
			'identity' => "username"
		];

		$default = json_encode($settings);

		Schema::table('users', function(Blueprint $table) use ($default) {
			
			$table->string('settings')->default($default)->after('password');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
