<?php namespace Bps\Commands;

use Bps\Commands\Command;

use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldBeQueued;

class UserRegistered extends Command implements ShouldBeQueued {

	use InteractsWithQueue, SerializesModels;

	protected $user, $activationtoken;

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct($user, $activationtoken)
	{
		$this->user = $user;
		$this->activationtoken = $activationtoken;

		\Log::info('activationtoken', ['code' => $activationtoken]);
	}

}
