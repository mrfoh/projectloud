<?php namespace Bps\Commands;

use Bps\Commands\Command;

use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Queue\ShouldBeQueued;
use Bps\Data\Repositories\Users;

class UserRegistered extends Command implements SelfHandling, ShouldBeQueued {

	use InteractsWithQueue, SerializesModels;

	protected $user;

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct($user)
	{
		$this->user = $user;
	}

	/**
	 * Execute the command.
	 *
	 * @return void
	 */
	public function handle()
	{
		//generate and save activation token
		$activationToken = $users->activationCode($this->user->id);

		//email data
		$data = ['activationtoken' => $activationToken, 'user' => $this->user];

		//user
		$user = $this->user;

		
		//send email
		\Mail::send('emails.users.activate', $data, function($message) use ($user) {

			$message->to($user->email)
					->subject('Activate your account')
					->from('no-reply@bayelsapublicsquare.com', 'Bayelsa Public Square');
		});
	}

}
