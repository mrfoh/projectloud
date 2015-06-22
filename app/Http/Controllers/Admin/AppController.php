<?php namespace Bps\Http\Controllers\Admin;
	
	use Illuminate\Http\Request;
	use Bps\Http\Controllers\AdminController;

	class AppController extends AdminController {

		public function __construct() {

			$this->middleware('admin.auth', ['only' => 'index']);
		}

		public function index(Request $request) {
			$viewdata['user'] = $request->user();

			return view('admin/app', $viewdata);
		}
	}