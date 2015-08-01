<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;
	use Prettus\Validator\Contracts\ValidatorInterface;


	class Reports extends BaseRepository {

		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\Report";
	    }

	    /**
	     * Specify Validator class name
	     *
	     * @return mixed
	     */
	    public function validator()
	    {
	        return "Bps\\Data\\Repositories\\Validators\\ReportValidator";
	    }

	    /**
	     * Specify Presenter class name
	     *
	     * @return string
	     */
	    public function presenter()
	    {
	        return "Bps\\Data\\Repositories\\Presenters\\ReportPresenter";
	    }

	    public function submit($comment, $attrs) {
	    	if( !is_null($this->validator) )
	        {
	            $this->validator->with($attrs)
	                ->passesOrFail( ValidatorInterface::RULE_CREATE );
	        }

	        $this->model->user_id = $attrs['user_id'];
	        $this->model->type = $attrs['type'];
	        $this->model->comment = $attrs['comment'];
	        $this->model->status = $attrs['status'];

	        $model = $this->model;
	        $model->save();

	        $comment->reports()->save($model);
	        
	        $this->resetModel();
	        return $this->parserResult($model);
 	    }
	}