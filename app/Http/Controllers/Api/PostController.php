<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Prettus\Validator\Exceptions\ValidatorException;
	use Illuminate\Database\Eloquent\ModelNotFoundException;
	use Bps\Data\Repositories\Posts;
	use Request;
	use Response;

	class PostController extends ApiController {

		protected $posts;

		public function __construct(Posts $posts) {
			$this->posts = $posts;
		}

		/**
		* Returns posts/post
		* @param integer $id
		* Post id
		* @access public
		**/
		public function index($id = null) {
			//options
			$status = Request::input('status', 'published');
			$perPage = Request::input('limit', 15);

			if(is_null($id))
			{
				return $this->posts->getAll($perPage, $status);
			}
			else 
			{
				try {

					$post = $this->posts->find($id);
					return $post;

				} catch(ModelNotFoundException $e) {
					return Response::json(['status'=>"error", 'message' => "Post not found"], 404);
				}
			}
		}

		/**
		* Stores a post
		* @param integer $id
		* Post id
		* @access public
		**/
		public function store($id = null) {
			if(is_null($id))
			{
				try {
					$input = Request::all();

					$post = $this->posts->create($input);

					return $post;

				} catch(ValidatorException $e) {

					$messages = $e->toArray();
					return Response::json($messages);
				}
			}
			else
			{
				$post = $this->posts->find($id);

				if(!$post) return Response::json(['message'=>"Post not found"], 200);

				try {
					$input = Request::all();

					$update = $this->posts->update($input, $id);

					return $update;

				} catch(ValidatorException $e) {
					$messages = $e->toArray();
					return Response::json($messages);
				}
			}
		}

		public function trash($id) {

		}

		public function delete($id) {

		}

		public function comments($id) {

		}
	}