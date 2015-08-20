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

	    public function getAll($perPage, $params) {

	    	if(!is_null($params['status'])) {

	    		if($params['status'] != "all") {
	    			$comments = $this->model->whereStatus($params['status'])->orderBy('created_at','desc')->paginate($perPage);
	    		}
	    		else {
	    			$comments = $this->model->orderBy('created_at','desc')->paginate($perPage);
	    		}
	    	}
	    	else {
	    		$comments = $this->model->orderBy('created_at','desc')->paginate($perPage);
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($comments);
	    }

	    public function approve($id) {

	    	$comment = $this->model->find($id);

	    	$comment->status = "approved";
	    	$comment->save();

	    	return $comment;
	    }

	    public function unapprove($id) {
	    	$comment = $this->model->find($id);

	    	$comment->status = "unapproved";
	    	$comment->save();

	    	return $comment;
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