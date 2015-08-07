<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;
	use Prettus\Validator\Contracts\ValidatorInterface;

	/**
	* Post Repository
	**/
	class Files extends BaseRepository {


		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\File";
	    }

	    public function presenter()
	    {
	        return "Bps\\Data\\Repositories\\Presenters\\FilePresenter";
	    }

	    public function getAll($perPage, $type) {
	    	if($type == "all") {
	    		$files = $this->model->orderBy('created_at','desc')->paginate($perPage);
	    	}

	    	if($type == "image") {
	    		$files = $this->model->where('mime','LIKE', '%image%')->orderBy('created_at','desc')->paginate($perPage);
	    	}

	    	if($type == "document") {
	    		$files = $this->model->where('mime','LIKE', '%pdf%')
	    							 ->orWhere('mime','LIKE', '%doc%')
	    							 ->orWhere('mime','LIKE','%word%')
	    							 ->orderBy('created_at','desc')
	    							 ->paginate($perPage);
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($files);
	    }

	    public function user($user, $type, $perPage) {
	    	if($type == "all") {
	    		$files = $this->model->where('user_id','=',$user->id)->orderBy('created_at','desc')->paginate($perPage);
	    	}

	    	if($type == "image") {
	    		$files = $this->model->where('mime','LIKE', '%image%')
	    							 ->where('user_id','=',$user->id)
	    							 ->orderBy('created_at','desc')
	    							 ->paginate($perPage);
	    	}

	    	if($type == "document") {
	    		$files = $this->model->where('mime','LIKE', '%pdf%')
	    							 ->orWhere('mime','LIKE', '%doc%')
	    							 ->orWhere('mime','LIKE','%word%')
	    							 ->orderBy('created_at','desc')
	    							 ->where('user_id','=',$user->id)
	    							 ->paginate($perPage);
	    	}

	    	$this->resetModel();
	    	return $this->parserResult($files);
	    }

	    public function remove(array $files) {

	    }


	    public function forceRemove(array $files) {
	    }
	}