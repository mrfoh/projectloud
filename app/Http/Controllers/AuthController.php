<?php namespace Bps\Http\Controllers;
	
	use Auth;
	use Illuminate\Http\Request;

	class AuthController extends Controller {

		public function __construct(Request $request) {
			$this->request = $request;
		}

		public function login() {

			$this->validate($this->request, ['email' => "required|email", 'password'=>"required"]);

			$email = $this->request->input('email');
			$password = $this->request->input('password');
			$remember = $this->request->input('remember', false);

			if(Auth::attempt(['email' => $email, 'password' => $password], $remember)) {
				return redirect()->intended('/');
			}
			else {
				return redirect()->back()->withInput()->with('message', 'Login Failed');
			}
		}

		public function logout() {

			Auth::logout();
			return redirect()->guest('/');
		}
	}