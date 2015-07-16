<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Prettus\Validator\Exceptions\ValidatorException;
	use Bps\Data\Repositories\Posts;
	use JWTAuth;
	use Request;
	use Response;

	class PostController extends ApiController {

		protected $posts;

		public function __construct(Posts $posts) {
			$this->middleware('jwt.auth', ['only' => ['store','bulkTrash','bullDelete']]);
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
			$status = Request::input('status');
			$perPage = Request::input('limit', 15);

			if(is_null($id))
			{
				return $this->posts->getAll($perPage, $status);
			}
			else 
			{
				$post = $this->posts->getByIdSlug($id);

				if(!$post) return response()->json(['status'=>'error', 'post not found'], 404);

				return $post;
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

			        if (! $user = JWTAuth::parseToken()->authenticate()) {
			            return response()->json(['user_not_found'], 404);
			        }

			    } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

			        return response()->json(['token_expired'], $e->getStatusCode());

			    } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

			        return response()->json(['token_invalid'], $e->getStatusCode());

			    } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

			        return response()->json(['token_absent'], $e->getStatusCode());

			    }

				try {       

					$input = Request::all();

					$post = $this->posts->make($input, $user);

					return $post;

				} catch(ValidatorException $e) {

					$messages = $e->toArray();
					return Response::json($messages);
				}
			}
			else
			{
				$post = $this->posts->find($id);

				if(!$post) return Response::json(['message'=>"Post not found"], 404);

				try {
					$input = Request::all();

					$update = $this->posts->updatePost($input, $id);

					return $update;

				} catch(ValidatorException $e) {
					$messages = $e->toArray();
					return Response::json($messages);
				}
			}
		}

		public function featuredPosts() {

			$count = Request::input('count', 5);

			return $this->posts->featured($count);
		}

		public function recentPosts() {

			$count = Request::input('count', 10);

			return $this->posts->recent($count);
		}

		public function feature($id) {
			$post = $this->posts->skipPresenter()->find($id);

			if(!$post) return Response::json(['message'=>"Post not found"], 404);

			$feature = $this->posts->feature($post);

			if($feature)
				return response()->json(['status'=>"success"], 200);
		}

		public function unfeature($id) {
			$post = $this->posts->skipPresenter()->find($id);

			if(!$post) return Response::json(['message'=>"Post not found"], 404);

			$unfeature = $this->posts->feature($post);

			if($unfeature)
				return response()->json(['status'=>"success"], 200);
		}

		public function comments($id) {

		}

		/**
		* Trash posts
		* @access public
		**/
		public function bulkTrash() {

			$posts = Request::input('posts');

			if(is_array($posts))
			{
				$delete = $this->posts->remove($posts);

				if($delete)
				{
					return response()->json(['status'=>"success"], 200);
				}
			}
		}

		/**
		* Delete posts
		* @access public
		**/
		public function bulkDelete() {
			$posts = Request::input('posts');

			if(is_array($posts))
			{
				$delete = $this->posts->forceRemove($posts);

				if($delete)
				{
					return response()->json(['status'=>"success"], 200);
				}
			}
		}

		public function bulkPublish() {

		}

		public function bulkUnpublish() {

		}
	}