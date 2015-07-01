<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Post;
	use Bps\Data\Transformers\TagTransformer;
	use League\Fractal\TransformerAbstract;

	class PostTransformer extends TransformerAbstract {

		/**
	     * List of resources to automatically include
	     *
	     * @var array
	     */
	    protected $defaultIncludes = ['tags'];

		/**
	     * Include Comments
	     *
	     * @param Post $post
	     * @return \League\Fractal\Resource\Item
	     */
	    public function includeTags(Post $post)
	    {
	        $tags = $post->tags;

	        return $this->collection($tags, new TagTransformer());
	    }

		public function transform(Post $post)
	    {
	        return [
	            'id'      => (int) $post->id,
	            'author'  => ($post->author) ? [
	            	'id' => $post->author->id,
	            	'name' => $post->author->name
	            ] : null,
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