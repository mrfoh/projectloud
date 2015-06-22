<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Post;
	use League\Fractal\TransformerAbstract;

	class PostTransformer extends TransformerAbstract {

		public function transform(Post $post)
	    {
	        return [
	            'id'      => (int) $post->id,
	            'title'   => $post->title,
	            'body'	  => $post->body,
	            'category' => ($post->category) ? ['id' => $post->category->id, 'name' => $post->category->name, 'slug' => $post->category->slug] : null,
	            'status' => $post->status,
	            'comment_count' => count($post->comments),
	            'created_at' => $post->created_at,
	            'updated_at' => $post->updated_at
	        ];
	    }
	}