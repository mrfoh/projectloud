<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Bps\Data\Repositories\Files;
	use Illuminate\Http\Request;
	use League\Flysystem\Filesystem;
	use League\Flysystem\Adapter\Local as Adapter;
	use JWTAuth;
	use Validator;

	class MediaController extends ApiController {

		protected $fs = null;

		protected $uploadRules = [
			'upload' => 'required|mimes:jpeg,png,gif,jpg,docx,doc,pdf|max:3024'
		];

		protected $uploadValidationMessages = [
			'upload.required' => "please select a file",
			'upload.mime' => "file type not allowed",
			'upload.max' => "max file upload size exceeded"
		];

		public function __construct() {

			$this->middleware('jwt.auth', ['only' => ['upload']]);

			$filesystem = new Filesystem(new Adapter($this->contentFolder()));
			$this->fs = $filesystem;
		}

		private function contentFolder() {
			if(\App::environment() == "local") {
				$folder = public_path()."\content";
			}
			else {
				$folder = "/var/www/bps/public/content";
			}

			return $folder;
		}

		private function subFolder() {
			$timestamp = time();
			//get current year
			$year = date("Y", $timestamp);
			//get current month
			$month = date("m", $timestamp);

			return $year."/".$month."/";
		}

		private function isExist($name) {
			return $this->fs->has($name);
		}

		private function disk() {
			if(\App::environment() == "local") {
				$folder = "local";
			}
			else {
				$folder = "s3";
			}

			return $folder;
		}

		public function upload(Request $request, Files $files) {
			//get all request data
			$input = $request->all();

			//create validation
			$validation = \Validator::make($input, $this->uploadRules, $this->uploadValidationMessages);

			//run validation
			if($validation->fails()) {
				$messages = $validation->messages();
				//return response
				return response()->json(['status'=>'error','messages'=>$messages], 403);
			}

			//get file
			$file = $request->file('upload');
			//file name
			$name = $this->subFolder().$file->getClientOriginalName();

			if($this->isExist($name)) {
				return response(['status' => 'error', 'message' => "File already exists on server"]);
			}

			//user 
			$user = $this->user();
			//disk
			$disk = 'local';
			//file extension
			$ext = $file->getClientOriginalExtension();
			//file path
			$src = $this->subFolder().strtolower($file->getClientOriginalName());
			//filename
			$src = str_replace(" ", "-", $src);
			$filename = strtolower($file->getClientOriginalName());
			$filename = str_replace(" ", "-", $filename);
			//file mime
			$mime = $file->getClientMimeType();
			//Open file stream
	        $stream = fopen($file->getRealPath(), 'r+');
	        //Write to stream
	        $this->fs->writeStream($name, $stream);
	         //get file size
	        $size = $this->fs->getSize($name);
	        //close stream
	        fclose($stream);

	   		//file attributes
	   		$attrs = ['name' => $filename, 'mime' => $mime, 'size' => $size, 'src' => $src, 'disk'=> $disk, 'user_id' => $user->id ];

	   		//save to db
	   		$file = $files->create($attrs);

	   		return $file;
		}

		public function index(Request $request, Files $files, $id = null) {
			//fetch all files
			if(is_null($id)) {
				//query params
				$type = $request->input('type', "all");
				$perPage = $request->input('count', 18);

				$media = $files->getAll($perPage, $type);

				return $media;
			}
			//fetch file
			else {
				$file = $files->find($id);

				if(!$file) return response()->json(['status'=>'error','message'=>"File not found"], 404);

				return $file;
			}
		}

		public function delete(Request $request, Files $files, $id) {

			$file = $files->skipPresenter(true)->find($id);

			if(!$file) return response()->json(['status'=>"error",'message'=>"File not found!"], 404);

			$this->fs->readAndDelete($file->src);

			$file->forceDelete();

			return response()->json(['status'=>"success", 'message'=>"File delete"]);
		}
	}

