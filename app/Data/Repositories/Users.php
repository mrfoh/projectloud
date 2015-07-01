<?php namespace Bps\Data\Repositories;
	
	use Prettus\Repository\Eloquent\BaseRepository;

	/**
	* User Repository
	**/
	class Users extends BaseRepository {

		/**
	     * Specify Model class name
	     *
	     * @return string
	     */
	    function model()
	    {
	        return "Bps\\Data\\Models\\User";
	    }

	    /**
	    * Find user by login
	    * @param string $id
	    * email is the login
	    * @return instanceof Bps\Data\Models\User
	    **/
	    public function findByLogin($id) {

	    	$user = $this->model->whereEmail($id)->first();

	    	$this->resetModel();
	    	return $this->parserResult($user);
	    }
	}