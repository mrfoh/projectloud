<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Comment;
	use League\Fractal\TransformerAbstract;

	class CommentTransformer extends TransformerAbstract {

		public function transform(Comment $comment)
	    {
	        return [
	     		'id' => $comment->id,
	     		'user' => ($comment->user) ? [
	     			'name' => $comment->user->name,
	     			'username' => $comment->user->username,
	     			'settings' => $comment->user->settings
	     		] : null,
	     		'body' => $comment->body,
	     		'reply_count' => count($comment->replies),
	     		'created_at' => $comment->created_at,
	     		'timestamp' => date("M d, Y @ h:ia", strtotime($comment->created_at)),
	     		'has_parent' => ($comment->parent_id) ? true : false,
	     		'status' => $comment->status
	        ];
	    }
	}