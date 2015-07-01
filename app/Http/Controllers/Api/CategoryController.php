<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Bps\Data\Repositories\Categories;
	use JWTAuth;
	use Request;
	use Response;

	class CategoryController extends ApiController {

		public function __construct(Categories $categories) {

			$this->middleware('jwt.auth', ['only' => ['store','delete']]);
		}

		/**
		* Retrieve single category model or paginated category collection
		* @param Bps\Data\Repositories\Categories $categories
		* Categories Repository
		* @param string $idSlug
		* id or slug of the category model
		* @return models/model
		**/
		public function index(Categories $categories, $idSlug = null) {

			if(is_null($idSlug))
			{
				//return categories
				return $categories->all();
			}
			else
			{
				//return category
				$category = $categories->findIdSlug($idSlug);

				if(!$category) return response()->json(['message'=>"category not found"], 404);

				return $category;
			}
		}

		public function posts() {

		}

		/**
		* Store/Update Category model
		* @param string $id
		* @return model
		* New or updated category model
		**/
		public function store(Categories $categories, $id = null) {

			$attrs = [ 'name' => Request::input('name'), 'slug' => str_slug(Request::input('name')) ];

			if(is_null($id)) {
				//Create new model
				$category = $categories->create($attrs);
				return $category;
			}
			else
			{
				//Update existing model
				$category = $categories->find($id);

				if(!$category) return response()->json(['message'=>"category not found"], 200);

				$category = $categories->update($attrs, $id);

				return $category;
			}
		}

		public function delete($id) {

		}
	}