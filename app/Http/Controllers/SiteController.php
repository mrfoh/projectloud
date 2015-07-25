<?php namespace Bps\Http\Controllers;

	use Bps\Data\Repositories\Categories;

	class SiteController extends Controller {


		/**
		 * Create a new controller instance.
		 *
		 * @return void
		 */
		public function __construct(Categories $categories)
		{
			$this->categories = $categories;
		}

		/**
		 * Show the application welcome screen to the user.
		 *
		 * @return Response
		 */
		public function index() {

			$categories = $this->categories->all();

			$data['categories'] = $categories;

			return view('site', $data);
		}

	}
