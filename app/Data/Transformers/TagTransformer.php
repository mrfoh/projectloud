<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Tag;
	use League\Fractal\TransformerAbstract;

	class TagTransformer extends TransformerAbstract {

		public function transform(Tag $tag)
	    {
	        return [
	   			'id' => $tag->id,
	   			'name' => $tag->name,
	   			'slug' =>  $tag->slug,
	   			'created_at' => $tag->created_at,
	   			'updated_at' => $tag->updated_at         
	        ];
	    }
	}