<?php namespace Bps\Commands;

use Bps\Commands\Command;

use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldBeQueued;

class OnCommentReply extends Command implements ShouldBeQueued {

	use InteractsWithQueue, SerializesModels;

	public $parentId, $user, $postId, $reply;
	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct($parentId, $user, $postId, $reply)
	{
		$this->parentId = $parentId;
		$this->user = $user;
		$this->postId = $postId;
		$this->reply = $reply;
	}

}
