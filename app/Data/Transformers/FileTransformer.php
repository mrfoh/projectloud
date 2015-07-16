<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\File;
	use League\Fractal\TransformerAbstract;

	class FileTransformer extends TransformerAbstract {

		private function diskPath($disk) {
			if($disk == "local") {
				return \Config::get('app.url')."/content/";
			} else {

			}
		}

		private function type($mime) {

			$image = ['image/jpeg','image/png','image/gif'];
			$document = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];

			if(in_array($mime, $image)) {
				return "image";
			}
			elseif(in_array($mime, $document)) {
				return "document";
			}
		}

		public function transform(File $file)
	    {
	        return [
	            'id' => $file->id,
	            'disk' => $file->disk,
	            'name' => $file->name,
	            'path' => $file->src,
	            'src' => $this->diskPath($file->disk).$file->src,
	            'mime' => $file->mime,
	            'type' => $this->type($file->mime),
	            'size' => $file->size,
	            'created_at' => $file->created_at,
	            'updated_at' => $file->updated_at
	        ];
	    }
	}