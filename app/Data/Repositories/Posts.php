<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;

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

	    /**
	    * Fetch all posts 
	    * @param integer $perPage
	    * No of models per page
	    * @param string $status
	    * status of the models
	    * @access public 
	    **/
	    public function getAll($perPage, $status = "published") {

	    	switch ($status) {
	    		case 'published':
	    			$posts = $this->model->published()->orderBy('created_at','asc')->paginate($perPage);
	    			break;

	    		case 'unpublished':
	    			$posts = $this->model->unpublished()->orderBy('created_at','asc')->paginate($perPage);
	    			break;

	    		case 'draft':
	    			$posts = $this->model->drafts()->orderBy('created_at','asc')->paginate($perPage);
	    			break;
	    		
	    		default:
	    			$posts = $this->model->orderBy('created_at','asc')->paginate($perPage);
	    			break;
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($posts);
	    }
	}