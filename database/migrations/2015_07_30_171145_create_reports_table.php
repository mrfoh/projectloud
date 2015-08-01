<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('reports', function (Blueprint $table) {

			$table->increments('id');
			$table->integer('user_id');
			$table->enum('type', ['intolerance','violence','name-calling','trolling']);
			$table->morphs('reportable');
			$table->text('comment')->nullable();
			$table->enum('status', ['pending', 'resolved']);
			$table->timestamps();
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
