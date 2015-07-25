<?php namespace Bps\Http\Controllers;
	
	use JWTAuth;

	class ApiController extends Controller {

		public function user() {
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

		public function getUser() {

			$token = JWTAuth::getToken();
			if($token) {
				try {

				    if (! $user = JWTAuth::parseToken()->authenticate()) {
				         return response()->json(['user_not_found'], 404);
				    }

				} catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
				    return false;
				} catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
			        return false;
				} catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
			        return false;
			    }

			    return $user;
			}
			else {
				return false;
			}
		}
	}