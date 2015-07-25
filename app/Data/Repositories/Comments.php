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

	    public function reply($attrs) {

	    	$model = $this->model->create($attrs);

	    	$this->resetModel();
	    	return $this->parserResult($model);
	    }

	    public function replies($id) {

	    	$models = $this->model->where('parent_id','=',$id)->orderBy('created_at','desc')->paginate(20);

	    	$this->resetModel();
	    	return $this->parserResult($models);
	    }

	    public function post($id) {

	    	$models = $this->model->where('post_id','=', $id)
	    						  ->orderBy('created_at','desc')
	    						  ->paginate(25);

	    	$this->resetModel();
	    	return $this->parserResult($models);
	    }
	}