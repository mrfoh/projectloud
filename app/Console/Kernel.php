<?php namespace Bps\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel {

	/**
	 * The Artisan commands provided by your application.
	 *
	 * @var array
	 */
	protected $commands = [
		'Bps\Console\Commands\Inspire',
		'Bps\Console\Commands\CreateSitemaps',
		'Bps\Console\Commands\Snapshots',
	];

	/**
	 * Define the application's command schedule.
	 *
	 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
	 * @return void
	 */
	protected function schedule(Schedule $schedule)
	{
		$schedule->command('inspire')
				 ->hourly();

		$schedule->command('sitemap')->dailyAt('23:55');
		$schedule->command('snapshot')->dailyAt('00:00');
	}

}
