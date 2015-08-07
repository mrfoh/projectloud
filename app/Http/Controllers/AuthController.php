<?php namespace Bps\Http\Controllers;
	
	use Auth;
	use JWTAuth;
	use JWTFactory;
	use Validator;
	use Bps\Data\Repositories\Users;
	use Bps\Data\Models\Role;
	use Tymon\JWTAuth\Exceptions\JWTException;
	use Bps\Commands\UserRegistered;
	use Illuminate\Http\Request;

	class AuthController extends Controller {

		private function claims($user) {
			$customClaims = [
				'name' => $user->name,
				'email' => $user->email,
				'settings' => $user->settings,
				'username' => $user->username,
				'roles' => $user->roles->toArray(),
				'active' => $user->active
			];

			return $customClaims;
		}
		public function authOauth(Request $request, Users $users) {
			$credentials = [
				'provider_id' => $request->input('provider_id'),
				'access_token' => $request->input('access_token'),
				'email' => $request->input('email')
			];
			$user = $users->findByProviderCredentials($credentials);
			if($user) {
				if(is_null($user->provider_id) || is_null($user->access_token) && !is_null($user->email)) {
					unset($credentials['email']);
					$update = $users->update($credentials, $user->id);

					$user = $update;
				}
			}
			else {
				//get role
				$role = Role::whereName('Regular')->first();
				$attrs = $request->only('name','email','access_token','provider_id','username');
				//create
				$user = $users->create($attrs);
				//assign role
				$user->roles()->attach($role->id);

				$activationtoken = $users->activationCode($user);

				$this->dispatch(new UserRegistered($user, $activationtoken));
			}

			try 
			{
				$customClaims = $this->claims($user);
				// attempt to verify the credentials and create a token for the user
				$token = JWTAuth::fromUser($user, $customClaims);
				// all good so return the token
			} catch (JWTException $e) {
				// something went wrong whilst attempting to encode the token
			    return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
			}

			return response()->json(['token'=>$token], 200);
		}

		public function login(Request $request, Users $users) {
			//user input
			$input = $request->all();
			//rules
			$rules = ['email' => "required|email", 'password' => "required"];
			//validator
			$validator = Validator::make($input, $rules);

			if($validator->fails()) {
				$messages = $validator->messages();
				return response()->json(['status'=>"error",'messages'=>$messages], 403);
			}

			//find user
	        $user = $users->findByLogin($request->input('email'));

	        if($user) {
	        	$credentials = ['email' => $input['email'], 'password' => $input['password']];
	        	$customClaims = $this->claims($user);

		        try {
		            // attempt to verify the credentials and create a token for the user
		            if (! $token = JWTAuth::attempt($credentials, $customClaims)) {
		                return response()->json(['status' => 'error', 'message' => 'invalid_credentials'], 401);
		            }
		        } catch (JWTException $e) {
		            // something went wrong whilst attempting to encode the token
		            return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
		        }

			    // all good so return the token
			    return response()->json(compact('token'));
			}
	        else {
			    return response()->json(['status' => 'error', 'message' => 'User not found'], 404);
			}
		}

		public function signup(Request $request, Users $users) {
			//user input
			$input = $request->all();
			//rules
			$rules = ['email' => "required|email|unique:users,email", 'password' => "required", 'username' => 'required|unique:users,username'];
			//validator
			$validator = Validator::make($input, $rules);

			if($validator->fails()) {
				$messages = $validator->messages();
				return response()->json(['status'=>"error",'messages'=>$messages], 403);
			}

			//get role
			$role = Role::whereName('Regular')->first();
			$attrs = $request->only('name','email','access_token','provider_id', 'username');
			$attrs['password'] = bcrypt($input['password']);
			//create
			$user = $users->create($attrs);
			//assign role
			$user->roles()->attach($role->id);

			$activationtoken = $users->activationCode($user);

			$this->dispatch(new UserRegistered($user, $activationtoken));

			try 
			{
				$customClaims = $this->claims($user);
				// attempt to verify the credentials and create a token for the user
				$token = JWTAuth::fromUser($user, $customClaims);
				// all good so return the token
			} catch (JWTException $e) {
				// something went wrong whilst attempting to encode the token
			    return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
			}

			return response()->json(['token'=>$token], 200);
		}

		public function refresh(Request $request, Users $users) {
			$token = JWTAuth::parseToken()->refresh();
			return response()->json(compact('token'));
		}

		public function activate(Users $users, $token, $id) {

			$user = $users->checkToken($token, $id);

			if($user) {
				//activate user
				$User = $users->activate($user);

				try 
				{
					$customClaims = $customClaims($User);
					// attempt to verify the credentials and create a token for the user
					$token = JWTAuth::fromUser($User, $customClaims);
					// all good so return the token
				} catch (JWTException $e) {
					// something went wrong whilst attempting to encode the token
				    return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
				}

				return redirect()->to('/#!/auth/'.$token);
			}
		}
	}