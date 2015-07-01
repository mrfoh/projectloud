<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Prettus\Validator\Exceptions\ValidatorException;
	use Bps\Data\Repositories\Tags;
	use JWTAuth;
	use Request;

	class TagController extends ApiController {

		public function __construct(Tags $tags) {
			$this->middleware('jwt.auth', ['only' => ['store','delete']]);
			$this->tags = $tags;
		}


		public function index($id = null) {

			if(is_null($id)) {
				//get all tags
				return $this->tags->paginate(20);
			}
			else {
				//get tag
				$tag = $this->tags->getByIdSlug($id);

				if(!$tag) return response()->json(['status' => "error", 'message'=>"Tag not found!!"], 404);

				return $tag;
			}
		}

		public function store($id = null) {

			if(is_null($id)) {
				//create new tag
				try
				{
					$input = [
						'name' => Request::input('name'),
						'slug' => str_slug(Request::input('name'))
					];

					$tag = $this->tags->create($input);

					return $tag;
				}
				catch(ValidatorException $e) {
					$messages = $e->toArray();
					return response()->json(['status'=>"error", 'messsages'=> $messages], 500);
				}
			}
			else {
				
				$input = Request::all();

				$tag = $this->tags->find($id);

				if(!$tag) return response()->json(['status'=>"error",'message'=>"Tag not found"], 404);

				try 
				{
					$tag = $this->tags->update($input, $id);

					return $tag;
				}
				catch(ValidatorException $e) {
					$messages = $e->toArray();
					return response()->json(['status'=>"error", 'messsages'=> $messages], 500);
				}
			}
		}

		public function delete($id) {

		}
	}