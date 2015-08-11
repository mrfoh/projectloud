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
	    	if(count($post->featured_image) > 0) {
	    		$images = $post->featured_image->toArray();
	    		$fi = $images[0];
	    	}
	    	else {
	    		$fi = null;
	    	}
	    	
	        return [
	            'id'      => (int) $post->id,
	            'url'     => \Config::get('app.url')."/article/".$post->slug,
	            'author'  => ($post->author) ? [
	            	'id' => $post->author->id,
	            	'name' => $post->author->name
	            ] : null,
	            'title'   => $post->title,
	            'slug' => $post->slug,
	            'excerpt' => $post->excerpt,
	            'featured_image' => $fi,
	            'body'	  => $post->body,
	            'category' => ($post->category) ? ['id' => $post->category->id, 'name' => $post->category->name, 'slug' => $post->category->slug] : null,
	            'status' => $post->status,
	            'featured' => ($post->featured == "no") ? false : true,
	            'comment_count' => count($post->comments),
	            'created_at' => $post->created_at,
	            'updated_at' => $post->updated_at,
	            'published_at' => date('d M, Y', strtotime($post->created_at))
	        ];
	    }
	}