app.controller('ArticleCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$stateParams', 'posts', 'comments',
	function($rootScope, $scope, $log, $document, $page, $stateParams, posts, comments) {
		//Post object
		$scope.post;
		//Loading
		$scope.loading = true;
		//post loaded
		$scope.postLoaded = false;
		//Keen
		$scope.Keen = null;

		$scope.postBoot = function() {
			//configure keen object
			$scope.Keen = new Keen({
			  projectId: "55c84a2590e4bd125b8cea98",
			  writeKey: "fb2a372f28e4f66190a905092ea708a7cea4b922e6ea2525b93db50ccb7816b9874f393a1a8f7d760715dc18817fe1de35984b0c2ec3fd9c4151bb5b279cf1769414d64543c798d5b41a0522d42e70c4ac50ae208dc11544952b304d0bce6adda371f001553e33c8184fb200bd1ac8c2"
			});
		}

		$scope.log = function() {
			var parser = new UAParser(),
				ua = parser.getResult();

			var $event = {
				'id': $scope.post.id,
				'title': $scope.post.title,
				'url': $scope.post.url,
				'created_at': $scope.post.created_at.date,
				'category': {
					'id': $scope.post.category.id,
					'name': $scope.post.category.name
				},
				'user_agent': {
					'browser': {
						'name': ua.browser.name,
						'version': ua.browser.version
					},
					'os': {
						'name': ua.os.name,
						'version': ua.os.version,
					},
					'engine': {
						'name': ua.engine.name,
						'version': ua.engine.version
					}
				},
				'env': window.BPS.Config.env
			};

			$scope.Keen.addEvent("post.view", $event);
		}

		$scope.share = function(url, mode) {
			if(mode == "facebook") {
				$scope.fbShare();
			}

			if(mode == "twitter") {
				window.open(encodeURI("http://twitter.com/intent/tweet?status="+$scope.post.title+"  "+url+"")
					, '_blank',"width=420,height=300");
			}

			if(mode == "google") {
				window.open(encodeURI("https://plus.google.com/share?url="+url+""), '_blank',"width=420,height=300");
			}
		}

		$scope.fbShare = function() {
			FB.ui({
				method: 'share',
				link: $scope.post.url,
				href: $scope.post.url,
				picture: window.BPS.Config.url+"/content/"+$scope.post.featured_image.src,
				name: $scope.post.title,
				caption: $scope.post.excerpt
			});
		}

		$scope.loadComments = function() {
			$rootScope.$broadcast('load:comments', { post: $scope.post });
		}

		$scope.fetch = function() {
			$scope.loading = true;			
			var $slug = $stateParams.slug;

			posts.get($slug)
			.success(function (response) {
				if(response.data) {
					$scope.post = response.data;
					$scope.loading = false;
					$scope.postLoaded = true;
					//set page title
					$page.setPageTitle($scope.post.title+ " - Bayelsa Public Square");
					$page.addMetaTag('description', $scope.post.excerpt);
					$page.addMetaTag('title', $scope.post.title);
					$page.addMetaTag('url', $scope.post.url);
					
					$page.addMetaTag('og:title', $scope.post.title);
					$page.addMetaTag('og:url', $scope.post.url);
					$page.addMetaTag('og:description', $scope.post.excerpt);

					if($scope.post.featured_image && $scope.post.featured_image.disk == "local") {
						//if disk is local
						$page.addMetaTag('og:image', window.BPS.Config.url+"/content/"+$scope.post.featured_image.src)
					}

					$rootScope.$broadcast('post:loaded', { post: $scope.post});
					$scope.log();
				}
			})
			.error(function (response) {
				$scope.loading = false;
				$scope.postLoaded = false;
			})
		}

		$scope.$on('fetch:post', $scope.fetch);
		$rootScope.$on('comments:updated', function (event, args) {
			$scope.post.comment_count = args.count;
		})

		$scope.$emit('fetch:post');
	}
]);