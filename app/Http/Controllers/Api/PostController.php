<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Prettus\Validator\Exceptions\ValidatorException;
	use Bps\Data\Repositories\Posts;
	use Bps\Data\Repositories\Comments;
	use Bps\Data\Repositories\Tags;
	use JWTAuth;
	use Request;
	use Response;
	use Cache;

	class PostController extends ApiController {

		protected $posts;

		public function __construct(Posts $posts, Comments $comments) {
			$this->middleware('jwt.auth', ['only' => ['store','bulkTrash','bullDelete']]);
			$this->posts = $posts;
			$this->comments = $comments;
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
				$posts = $this->posts;
				//check if entity exist in cache
				if(Cache::has($id)) {
					$post = Cache::get($id);
				}
				else {
					$post = Cache::remember($id, 360, function() use ($posts, $id) {
						return $posts->getByIdSlug($id);
					});
				}
				

				return $post;
			}
		}

		public function related($id) {
			//options
			$perPage = Request::input('limit', 5);
			//post
			$post = $this->posts->skipPresenter()->find($id);

			if(!$post) return Response::json(['message'=>"Post not found"], 404);

			return $this->posts->skipPresenter(false)->related($post, $perPage);
		}
		/**
		* Retrieve post by user 
		* @param integer $userid
		**/
		public function by($userid) {
			//options
			$status = Request::input('status','all');
			$perPage = Request::input('limit', 10);

			return $this->posts->by($userid, $status, $perPage);
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
				$user = $this->user();

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
			$category = Request::input('category_id', null);

			return $this->posts->featured($count, $category);
		}

		public function recentPosts() {

			$count = Request::input('count', 10);
			$category = Request::input('category_id', null);

			return $this->posts->recent($count, $category);
		}

		public function tagged(Tags $tags, $slug) {

			$count = Request::input('count', 10);
			
			return $this->posts->tagged($slug, $count);
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

			$unfeature = $this->posts->unfeature($post);

			if($unfeature)
				return response()->json(['status'=>"success"], 200);
		}

		public function comments($id) {
			$post = $this->posts->skipPresenter()->find($id);

			if(!$post) return Response::json(['message'=>"Post not found"], 404);

			$comments = $this->comments->post($id);

			return $comments;
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