<?php namespace Bps\Http\Controllers\Admin;

	use Illuminate\Http\Request;
	use JWTAuth;
	use JWTFactory;
	use Bps\Data\Repositories\Users;
	use Tymon\JWTAuth\Exceptions\JWTException;
	use Bps\Http\Controllers\AdminController;

	class AuthController extends AdminController {

		public function index(Request $request, Users $users) {
			// grab credentials from the request
	        $credentials = $request->only('email', 'password');
	        //find user
	        $user = $users->findByLogin($request->input('email'));

	        if($user && $user->isAdmin()) {
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
	}