<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;

	/**
	* Post Repository
	**/
	class Comments extends BaseRepository {

		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\Comment";
	    }

	    /**
	    * Specify Validator class name
	    *
	    * @return mixed
	    */
	    public function validator()
	    {
	        return "Bps\\Data\\Repositories\\Validators\\CommentValidator";
	    }

	    /**
	     * Specify Presenter class name
	     *
	     * @return string
	     */
	    public function presenter()
	    {
	        return "Bps\\Data\\Repositories\\Presenters\\CommentPresenter";
	    }

	}