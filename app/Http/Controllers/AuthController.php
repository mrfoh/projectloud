<?php namespace Bps\Http\Controllers;
	
	use Auth;
	use Illuminate\Http\Request;

	class AuthController extends Controller {

		public function __construct(Request $request) {
			$this->request = $request;
		}

		public function login() {

		}

		public function logout() {

			
		}
	}