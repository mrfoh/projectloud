<?php namespace Bps\Http\Controllers\Admin;

	use Session;
	use Bps\Http\Controllers\AdminController;

	class AuthController extends AdminController {

		public function showlogin() {
			$data['message'] = Session::get('message');

			return view('admin.auth.login', $data);
		}
}