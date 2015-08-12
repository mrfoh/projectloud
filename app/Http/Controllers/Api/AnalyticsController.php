<?php namespace Bps\Http\Controllers\Api;

	use Bps\Http\Controllers\ApiController;
	use Bps\Data\Repositories\Posts;
	use KeenIO\Client\KeenIOClient;
	use JWTAuth;
	use Request;

	class AnalyticsController extends ApiController {

		protected $client;

		public function __construct() {
			$this->client = KeenIOClient::factory([
			    'projectId' => env('KEEN_PROJECT'),
			    'writeKey'  => env('KEEN_WRITE'),
			    'readKey'   => env('KEEN_READ')
			]);
		}

		/**
		* Retrieving posts that trending(popular) for a time period
		**/
		public function trendingPosts(Posts $posts) {
			//fiters
			$filters = [
				['property_name' => 'env', 'operator' => 'eq', 'property_value' => 'local']
			];
			//group by
			$group = "id";
			//timeframe
			$timeframe = "this_14_days";
			//count post views
			$views = $this->client->count('post.view', ['filters' => $filters, 'group_by'=> $group, 'timeframe' => $timeframe]);

			if( count($views['result']) > 0) {
				$ids = [];

				foreach($views['result'] as $view) {
					if($view['result'] >= 100) {
						$ids[] = $view['id'];
					}
				}

				return $posts->getAllIn($ids);
			}
		}
	}