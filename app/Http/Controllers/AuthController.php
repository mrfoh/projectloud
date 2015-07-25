<?php namespace Bps\Http\Controllers;
	
	use Auth;
	use JWTAuth;
	use JWTFactory;
	use Validator;
	use Bps\Data\Repositories\Users;
	use Bps\Data\Models\Role;
	use Tymon\JWTAuth\Exceptions\JWTException;
	use Illuminate\Http\Request;

	class AuthController extends Controller {


		private function token($user) {
			try 
			{
				$customClaims = ['name' => $user->name, 'roles' => $user->roles->toArray()];
				// attempt to verify the credentials and create a token for the user
				$token = JWTAuth::fromUser($user, $customClaims);
				// all good so return the token
		    	return response()->json(compact('token'));
			} catch (JWTException $e) {
				// something went wrong whilst attempting to encode the token
		        return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
		    }
		}

		public function authFb(Request $request, Users $users) {
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
				$attrs = $request->only('name','email','access_token','provider_id');
				//create
				$user = $users->create($attrs);
				//assign role
				$user->roles()->attach($role->id);
			}

			try 
			{
				$customClaims = ['name' => $user->name, 'roles' => $user->roles->toArray()];
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
	        	$customClaims = ['name' => $user->name, 'roles' => $user->roles->toArray()];

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
			    return response()->json(['status' => 'error', 'message' => 'access denied'], 401);
			}
		}

		public function refresh(Request $request, Users $users) {
			$token = JWTAuth::parseToken()->refresh();

			return response()->json(compact('token'));
		}
	}