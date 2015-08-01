<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Prettus\Validator\Exceptions\ValidatorException;
	use Illuminate\Database\Eloquent\ModelNotFoundException;
	use Bps\Data\Repositories\Comments;
	use Bps\Data\Repositories\Reports;
	use Validator;
	use Request;
	use Response;

	class CommentController extends ApiController {

		public function __construct() {
			$this->middleware('jwt.auth', ['only' => ['store','reply','report']]);
		}

		protected $rulesCreateDefault = [
			'body' => 'required',
			'post_id' => 'required'
		];

		protected $rulesCreateNoUser = [
			'name' => 'required',
			'email' => 'required|email'
		];

		public function index($id = null) {

		}

		public function store(Comments $comments, $id = null) {
			//Create new post
			if(is_null($id)) {
				$user = $this->user();
				$input = Request::all();
				
				if($user) {
					$rules = $this->rulesCreateDefault;
				}
				else {
					$rules = array_merge($this->rulesCreateDefault, $this->rulesCreateNoUser);
				}

				$validation = Validator::make($input, $rules);

				if($validation->fails()) {
					$messages = $validation->messages();
					//return response
					return response()->json(['status'=>'error','messages'=>$messages], 403);
				}

				$attrs = [
					'body' => Request::input('body'),
					'post_id' => Request::input('post_id'),
					'user_id' => ($user) ? $user->id : null,
					'name' => Request::input('name'),
					'email' => Request::input('email'),
					'status' => 'unapproved'
				];

				try {
					$comment = $comments->create($attrs);

					return $comment;
				}
				catch(ValidatorException $e) {
					$messages = $e->toArray();
					return Response::json($messages);
				}
			}
			else {

			}
		}

		public function report(Comments $comments, Reports $reports, $id) {

			$comment = $comments->skipPresenter()->find($id);
			if(!$comment) return response()->json(['status'=>"error",'message'=>"comment not found"], 404);

			$user = $this->user();

			if($comment->user_id != $user->id) {

				$attrs = [
					'user_id' => $user->id,
					'type' => Request::input('type'),
					'comment' => Request::input('comment', null),
					'status' => 'pending'
				];

				$report = $reports->submit($comment, $attrs);

				if($report) {
					return response()->json(['status' => "success"], 200);
				}
			}
			else {
				return response()->json(['status' => "error", 'message' => "Cannot report your comment"], 405);
			}
		}

		public function reply(Comments $comments, $id) {

			$parent = $comments->find($id);
			if(!$parent) return response()->json(['status'=>"error",'message'=>"comment not found"], 404);

			$user = $this->user();
			$input = Request::all();
				
			if($user) {
				$rules = $this->rulesCreateDefault;
			}
			else {
				$rules = array_merge($this->rulesCreateDefault, $this->rulesCreateNoUser);
			}

			$valdation = Validator::make($input, $rules);
			
			if($valdation->fails()) {
				$messages = $validation->messages();
				return response()->json(['status'=>'error','messages'=>$messages], 403);
			}

			$attrs = [
				'parent_id' => $parent['data']['id'],
				'body' => Request::input('body'),
				'post_id' => Request::input('post_id'),
				'user_id' => ($user) ? $user->id : null,
				'name' => Request::input('name', null),
				'email' => Request::input('email', null),
				'status' => 'unapproved'
			];

			$reply = $comments->reply($attrs);

			if($reply)
				return $reply;
		}

		public function replies(Comments $comments, $id) {
			
			$replies = $comments->replies($id);

			return $replies;
		}
	}