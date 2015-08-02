<?php namespace Bps\Handlers\Commands;

use Bps\Commands\UserRegistered;

use Illuminate\Queue\InteractsWithQueue;
use Mail;
use Log;

class UserRegisteredHandler {

	protected $users;
	/**
	 * Create the command handler.
	 *
	 * @return void
	 */
	public function __construct()
	{
	}

	/**
	 * Handle the command.
	 *
	 * @param  UserRegistered  $command
	 * @return void
	 */
	public function handle(UserRegistered $command)
	{
		Log::info('Activity:', ['context'=>"user registered",'user'=>$command->user]);

		$data['activationtoken'] = $command->activationtoken;
		$data['user'] = $command->user;

		$user = $command->user;

		Mail::send('emails.users.activate', $data, function($message) use ($user) {
			$message->to($user->email)->subject('Activate your account');
		});
	}

}
