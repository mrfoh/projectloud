<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;
	use Prettus\Validator\Contracts\ValidatorInterface;

	/**
	* Post Repository
	**/
	class Posts extends BaseRepository {


		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\Post";
	    }

	    /**
	     * Specify Validator class name
	     *
	     * @return mixed
	     */
	    public function validator()
	    {
	        return "Bps\\Data\\Repositories\\Validators\\PostValidator";
	    }

	    /**
	     * Specify Presenter class name
	     *
	     * @return string
	     */
	    public function presenter()
	    {
	        return "Bps\\Data\\Repositories\\Presenters\\PostPresenter";
	    }

	    public function allPublished() {

	    	$posts = $this->model->published()->orderBy('created_at','desc')->get();

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    /**
	    * Fetch all posts 
	    * @param integer $perPage
	    * No of models per page
	    * @param string $status
	    * status of the models
	    * @access public 
	    **/
	    public function getAll($perPage, $status) {

	    	switch ($status) {
	    		case 'published':
	    			$posts = $this->model->with('author')->published()->orderBy('created_at','desc')->paginate($perPage);
	    			break;

	    		case 'unpublished':
	    			$posts = $this->model->with('author')->unpublished()->orderBy('created_at','desc')->paginate($perPage);
	    			break;

	    		case 'draft':
	    			$posts = $this->model->with('author')->drafts()->orderBy('created_at','desc')->paginate($perPage);
	    			break;

	    		case 'trash':
	    			$posts = $this->model->with('author')->onlyTrashed()->orderBy('deleted_at','desc')->paginate($perPage);
	    			break;
	    		
	    		default:
	    			$posts = $this->model->with('author')->orderBy('created_at','desc')->paginate($perPage);
	    			break;
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    public function getAllIn(Array $ids) {
	    	$posts = $this->model->whereIn('id', $ids)->orderBy('created_at','desc')->get();

	    	$this->resetModel();
	    	return $this->parserResult($posts);	
	    }

	    public function by($id, $status, $perPage) {
	    	switch ($status) {
	    		case 'published':
	    			$posts = $this->model->with('author')->published()->where('user_id','=',$id)->orderBy('created_at','desc')->paginate($perPage);
	    			break;

	    		case 'unpublished':
	    			$posts = $this->model->with('author')->unpublished()->where('user_id','=',$id)->orderBy('created_at','desc')->paginate($perPage);
	    			break;

	    		case 'draft':
	    			$posts = $this->model->with('author')->drafts()->where('user_id','=',$id)->orderBy('created_at','desc')->paginate($perPage);
	    			break;
	    		
	    		default:
	    			$posts = $this->model->with('author')->where('user_id','=',$id)->orderBy('created_at','desc')->paginate($perPage);
	    			break;
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    /**
	    * Retrieves featured post models
	    * @param integer $count
	    * no per page
	    **/
	    public function featured($count, $category) {
	    	if(is_null($category)) {
	    		$posts = $this->model->published()->where('featured','yes')->orderBy('created_at','desc')->paginate($count);
	    	}
	    	else {
	    		$posts = $this->model->published()->where('featured','yes')
	    										 ->where('category_id','=', $category)
	    									     ->orderBy('created_at','desc')
	    									     ->paginate(3);
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    /**
	    * Retrieves recent non-featured post models
	    * @param integer $count
	    * no per page
	    **/
	    public function recent($count, $category) {
	    	if(is_null($category)) {
	    		$posts = $this->model->published()->where('featured','no')->orderBy('created_at','desc')->paginate($count);
	    	}
	    	else {
	    		$posts = $this->model->published()->where('featured','no')
	    										 ->where('category_id','=', $category)
	    									     ->orderBy('created_at','desc')
	    									     ->paginate($count);
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    /**
	    * Retrieves post models in a category
	    * @param object $category
	    * @param integer $count
	    * no per page
	    **/
	    public function category($category, $count) {
	    	$posts = $this->model->published()->where('category_id','=', $category->id)->orderBy('created_at','desc')->paginate($count);

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	     /**
	    * Retrieves post models tagged by a tag
	    * @param object $tag
	    * @param integer $count
	    * No of models to retrieve per page
	    **/
	    public function tagged($tag, $count) {
	    	
	    	$posts = $this->model->published()->whereHas('tags', function($q) use ($tag) {
	    		$q->where('slug', '=', $tag);
	    	})
	    	->orderBy('created_at', 'desc')
	    	->paginate($count);

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }

	    /**
	    * Get post model by id or slug attribute
	    * @param string $idSlug
	    * id or slug of post model
	    * @return array 
	    **/
	    public function getByIdSlug($idSlug) {
	    	$post = $this->model->where('id', '=', $idSlug)->orWhere('slug', '=', $idSlug)->first();

	    	$this->resetModel();
	    	return $this->parserResult($post);
	    }

	    /**
	    * Create a new post
	    * @param array $attributes
	    * @param object $user
	    * @return model
	    **/
	    public function make(array $attributes, $user) {
	    	if( !is_null($this->validator) )
	        {
	            $this->validator->with($attributes)
	                ->passesOrFail( ValidatorInterface::RULE_CREATE );
	        }

	        //set model attributes
	        $this->model->title = $attributes['title'];
	        $this->model->user_id = $user->id;
	        $this->model->slug = str_slug($attributes['title']);
	        $this->model->category_id = (!is_null($attributes['category'])) ? $attributes['category']['id'] : null;
	        $this->model->excerpt = (isset($attributes['excerpt'])) ? $attributes['excerpt'] : null;
	        $this->model->body = $attributes['body'];
	        $this->model->status = (isset($attributes['status'])) ? $attributes['status'] : 'draft';

	        $model = $this->model;

	        $model->save();

	        if(isset($attributes['tags']) && count($attributes['tags']) > 0) {
	        	$tags = [];
	        	foreach($attributes['tags'] as $tag) {
	        		$tags[] = $tag['id'];
	        	}
	        	$this->model->tags()->sync($tags);
	        }

	        if(isset($attributes['featured_image'])) {
	        	$this->model->featured_image()->sync([$attributes['featured_image']['id']]);
	        }

	        $this->resetModel();
	        return $this->parserResult($model);
	    }

	    /**
	    * Update a post
	    * @param array $attributes
	    * @param integer $id
	    * id of post model
	    * @return model
	    **/
	    public function updatePost(array $attributes, $id) {
	    	if( !is_null($this->validator) )
	        {
	            $this->validator->with($attributes)
	                ->passesOrFail( ValidatorInterface::RULE_UPDATE );
	        }

	        $post = $this->model->find($id);

	        $post->title = $attributes['title'];
	        $post->slug = str_slug($attributes['title']);
            $post->category_id = (!is_null($attributes['category'])) ? $attributes['category']['id'] : null;
            $post->excerpt = $attributes['excerpt'];
	        $post->body = $attributes['body'];
            $post->status = $attributes['status'];

	        $post->save();

	        if(!is_null($attributes['tags'])) {
	        	$tags = [];
	        	foreach($attributes['tags'] as $tag) {
	        		$tags[] = $tag['id'];
	        	}

	        	$post->tags()->sync($tags);
	        }

	        if(!is_null($attributes['featured_image'])) {
	        	$post->featured_image()->sync([$attributes['featured_image']['id']]);
	        }

	        $this->resetModel();

	        return $this->parserResult($post);
	    }

	    /**
	    * Feature a post
	    * @param object $post
	    **/
	    public function feature($post) {
	    	if(!$post) return false;

	    	$post->featured = "yes";
	    	$post->save();

	    	$this->resetModel();

	    	return $this->parserResult($post);	
	    }

	    /**
	    * Feature a post
	    * @param object $post
	    **/
	    public function unfeature($post) {
	    	if(!$post) return false;

	    	$post->featured = "no";
	    	$post->save();

	    	$this->resetModel();

	    	return $this->parserResult($post);	
	    }

	    /**
	    * Trashes models
	    * @param array $posts
	    * models to be trashed
	    * @return boolean
	    **/
	    public function remove(array $posts) {

	    	if(!$posts) return false;

			$toDelete = array();
			foreach($posts as $post) {
				$toDelete[] = $post['id'];
			}

			if($toDelete)
			{
				$models = $this->model->whereIn('id', $toDelete)->get();
				foreach($models as $model) {
					$model->delete();
				}

				$this->resetModel();
				return true;
			}
			else
			{
				$this->resetModel();
				return false;
			}
	    }

	    /**
	    * Permanently deletes models
	    * @param array $posts
	    * models to be deleted
	    * @return boolean
	    **/
	    public function forceRemove(array $posts) {

	    	if(!$posts) return false;

			$toDelete = array();
			foreach($posts as $post) {
				$toDelete[] = $post['id'];
			}
			
			if($toDelete)
			{
				$models = $this->model->withTrashed()->whereIn('id', $toDelete)->get();
				foreach($models as $model) {
					$model->forcedelete();
				}

				return true;
			}
			else
			{
				return false;
			}
	    }
	}