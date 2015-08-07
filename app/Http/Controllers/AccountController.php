<?php namespace Bps\Http\Controllers;
	
	use JWTAuth;
	use JWTFactory;
	use Validator;
	use Hash;
	use Bps\Data\Repositories\Users;
	use Tymon\JWTAuth\Exceptions\JWTException;
	use Illuminate\Http\Request;

	class AccountController extends Controller {

		protected $users;

		public function __construct(Users $users) {

			$this->middleware('jwt.auth');
			$this->users = $users;
		}

		private function user() {
			try {

			    if (! $user = JWTAuth::parseToken()->authenticate()) {
			          return response()->json(['user_not_found'], 404);
			    }

			} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
			    return response()->json(['token_expired'], 401);

			} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

		        return response()->json(['token_invalid'], $e->getStatusCode());

			} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

		        return response()->json(['token_absent'], $e->getStatusCode());

		    }

		    return $user;
		}

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

		/**
		* Update authenticated user profile
		**/
		public function profile(Request $request) {

			$user = $this->user();

			$attrs = $request->only('username','name','email');

			$user = $this->users->update($attrs, $user->id);

			$claims = $this->claims($user);

			$currentToken = JWTAuth::getToken();

			JWTAuth::invalidate($currentToken);

			try 
			{
				// attempt to verify the credentials and create a token for the user
				$token = JWTAuth::fromUser($user, $claims);
				// all good so return the token
			} catch (JWTException $e) {
				// something went wrong whilst attempting to encode the token
			    return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
			}

			return response()->json(['status'=>"success", 'token' => $token], 200);
		}

		/**
		* Update authenticated user settings
		**/
		public function settings(Request $request) {
			$user = $this->user();

			$attrs = $request->only('settings');

			$user->settings = $request->input('settings');
			$user->save();
			
			$claims = $this->claims($user);

			$currentToken = JWTAuth::getToken();

			JWTAuth::invalidate($currentToken);

			try 
			{
				// attempt to verify the credentials and create a token for the user
				$token = JWTAuth::fromUser($user, $claims);
				// all good so return the token
			} catch (JWTException $e) {
				// something went wrong whilst attempting to encode the token
			    return response()->json(['status' => 'error', 'message' => 'could_not_create_token'], 500);
			}

			return response()->json(['status'=>"success", 'token' => $token], 200);
		}

		public function password(Request $request) {

			$user = $this->user();

			$input = $request->all();

			$rules = [
				'current' => 'required',
				'update' => 'required|min:5',
				'confirm' => 'required|min:5|same:update'
			];

			$validator = Validator::make($input, $rules);

			if($validator->fails()) {
				$messages = $validator->messages();
				return response()->json(['status'=>"error", 'messages' => $messages], 403);
			}

			if(!Hash::check($input['current'], $user->password)) {
				return response()->json(['status'=>"error", 'message' => "Current password incorrect"], 403);
			}

			$user->password = bcrypt($input['current']);
			$user->save();

			return response()->json(['status' => "success"], 200);
		}
	}