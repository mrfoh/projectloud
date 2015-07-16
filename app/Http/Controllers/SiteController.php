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

			$this->categories->skipPresenter();
			$categories = $this->categories->all()->toArray();

			$data['categories'] = $categories;

			return view('site', $data);
		}

	}
