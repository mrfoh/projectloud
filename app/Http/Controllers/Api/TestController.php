<?php namespace Bps\Http\Controllers\Api;
	
	use Illuminate\Http\Request;
	use Bps\Http\Controllers\ApiController;

	class TestController extends ApiController {

		public function __construct() {

			$this->middleware('api.auth', ['only' => 'index']);
		}

		public function index(Request $request) {
			
		}
	}