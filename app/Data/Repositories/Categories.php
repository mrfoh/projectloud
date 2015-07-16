<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;

	class Categories extends BaseRepository {

		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\Category";
	    }

	    /**
	     * Specify Validator class name
	     *
	     * @return mixed
	     */
	    public function validator()
	    {
	        return "Bps\\Data\\Repositories\\Validators\\CategoryValidator";
	    }

	    /**
	     * Specify Presenter class name
	     *
	     * @return string
	     */
	    public function presenter()
	    {
	        return "Bps\\Data\\Repositories\\Presenters\\CategoryPresenter";
	    }

	    public function findIdSlug($idSlug) {
	    	
	    	$category = $this->model->where('id', '=', $idSlug)->orWhere('slug', '=', $idSlug)->first();

	    	$this->resetModel();
	    	return $this->parserResult($category);
	    }
	}