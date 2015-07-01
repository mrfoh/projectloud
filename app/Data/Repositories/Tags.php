<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;

	class Tags extends BaseRepository {

		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\Tag";
	    }

	    /**
	     * Specify Validator class name
	     *
	     * @return mixed
	     */
	    public function validator()
	    {
	        return "Bps\\Data\\Repositories\\Validators\\TagValidator";
	    }

	    public function presenter()
	    {
	    	return "Bps\\Data\\Repositories\\Presenters\\TagPresenter";
	    }
	}