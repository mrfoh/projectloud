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
	    * Generate an activation token
		* @param Eloquent object $user
		* @return string
	    **/
	    public function activationCode($user) {

	    	$timestamp = time();
	    	$email = $user->email;

	    	//combine hashes
	    	$token = md5($email).".".md5($timestamp);

	    	//set token
	    	$user->activation_token = $token;
	    	$user->save();

	    	return $token;
	    }

	    public function checkToken($token, $id) {

	    	$user = $this->model->where('activation_token','=',$token)->where('id','=', $id)->first();

	    	return $user;
	    }

	    public function activate($user) {

	    	$user->active = "yes";
	    	$user->save();

	    	return $user;
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