<?php namespace Bps\Handlers\Commands;

use Bps\Commands\OnCommentReply;
use Bps\Data\Repositories\Comments;
use Mail;
use Log;
use Illuminate\Queue\InteractsWithQueue;

class OnCommentReplyHandler {

	protected $comments;
	/**
	 * Create the command handler.
	 *
	 * @return void
	 */
	public function __construct(Comments $comments)
	{
		$this->comments = $comments;
	}

	/**
	 * Handle the command.
	 *
	 * @param  OnCommentReply  $command
	 * @return void
	 */
	public function handle(OnCommentReply $command)
	{
		//get parent comment
		$comment = $this->comments->skipPresenter(true)->find($command->parentId);

		//get post
		$post = $this->comments->skipPresenter(true)->find($command->postId);

		$reply = $command->reply;

		//recipient
		$recipient = $comment->user;

		if($recipient->settings->replies == "1") {
			//Send user reply notification email
			$data = ['user' => $command->user, 'comment' => $comment, 'recipient' => $recipient, 'post' => $post, 'reply' => $reply];

			Mail::send('email.notifications.reply', $data, function($message) use ($recipient) {

				$message->to($recipient->email)->subject('You have a new comment reply');
			});
		}
	}

}
