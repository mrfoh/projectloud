<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Category;
	use League\Fractal\TransformerAbstract;

	class CategoryTransformer extends TransformerAbstract {

		public function transform(Category $category)
	    {
	        return [
	            'id' => $category->id,
	            'name' => $category->name,
	            'posts' => count($category->posts()),
	            'description' => $category->description,
	            'keywords' => $category->keywords
	        ];
	    }
	}