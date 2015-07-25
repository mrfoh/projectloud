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

	    public function findByProviderCredentials($creds) {

	    	$user = $this->model->where('provider_id','=',$creds['provider_id'])
	    						->orWhere('access_token','=', $creds['access_token'])
	    						->orWhere('email','=', $creds['email'])
	    						->first();

	    	$this->resetModel();
	    	return $this->parserResult($user);
	    }
	}