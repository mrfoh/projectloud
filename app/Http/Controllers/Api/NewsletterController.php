<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use JWTAuth;
	use Request;
	use Response;
	use Validator;
	use Mailchimp;

	class NewsletterController extends ApiController {
		protected $listid = "7f909833b5";

		private function isSubscribed($email) {
			return Mailchimp::check($this->listid, $email);
		}

		public function subscribe() {
			//user input
			$input = Request::all();
			//rules
			$rules = ['email' => "required|email"];
			//validation
			$validation = Validator::make($input, $rules);

			if($validation->fails()) {
				$messages = $validation->messages();
				//return response
				return response()->json(['status'=>'error','messages'=>$messages], 403);
			}

			$email = Request::input('email');
			//check user is subscribed to list
			if(!$this->isSubscribed($email)) {
				try {
					$subscribe = Mailchimp::subscribe($this->listid, $email, [], false);
					if($subscribe) {
						return response()->json(['status'=>"success"], 200);
					}
				}	
				catch(NZTim\Mailchimp\MailchimpException $e) {
					return response()->json(['status'=>"error", 'message' => $e->message], 500);
				}
			}
			else {
				return response()->json(['status'=>"error", 'message' => "You are already subscribed"], 200);
			}
		}
	}