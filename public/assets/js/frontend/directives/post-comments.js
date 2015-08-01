angular.module('app')
.controller('CommentCtrl', ['$rootScope','$scope','$timeout','posts', 'comments', '$auth', '$filter',
 function($rootScope, $scope, $timeout, posts, comments, $auth, $filter) {
	$scope.count;
	$scope.showform = false;
	$scope.comments = [];
	$scope.loading = false;
	$scope.post_id;
	$scope.sessionExist = $auth.check();
	$scope.disableSubmitBtn = false;
	$scope.submitBtnText = "Submit"

	$scope.submitComment = function() {
		var $form = { body: $scope.body, post_id: $scope.post_id }
		$scope.disableSubmitBtn = true;
		$scope.submitBtnText = '<i class="fa fa-spin fa-spinner"></i> Posting...'

		comments.create($form)
		.success(function(response, status, headers, config) {

			$scope.disableSubmitBtn = false;
			$scope.submitBtnText = "Submit";
			$scope.body = "";

			if(response.data) {
				var $comment = response.data;
				$comment.showreplyform = false;
				$comment.replies = [];
				$comment.replyloading = false;
				$comment.showreplies = false;

				$scope.comments.push($comment);
				$rootScope.$broadcast('comments:updated', { count: $scope.comments.length });
			}
		})
		.error(function(response, status, headers, config) {

			$scope.disableSubmitBtn = false;
			$scope.submitBtnText = "Submit";

		})
	}

	$scope.submitReply = function($event, comment) {
		var el = angular.element($event.currentTarget);
		el.attr('disabled', 'disabled');
		el.html('Posting...');

		var $comment = { body: comment.reply, post_id: $scope.post_id };
		comments.reply($comment, comment.id)
		.success(function (response, status, headers, config) {

			el.removeAttr('disabled');
			el.html('Submit');
			comment.reply = '';
			comment.showreplyform = false;
		

			if(response.data) {
				var $c = response.data;
				$c.showreplyform = false;
				$c.replies = []
				$c.replyloading = false;
				$c.showreplies = false;

				comment.replies.push($c);
				comment.showreplies = true;
				comment.reply_count = comment.replies.length;
			}
		})
		.error(function (response, status, headers, config) {
			el.removeAttr('disabled');
			el.html('Submit');
		})
	}

	$scope.showReplyForm = function($comment) {
		if($scope.sessionExist)
			$comment.showreplyform = true;
		else
			$comment.showreplyform = false;
	}

	$scope.loadReplies = function($comment) {
		$comment.replyloading = true;

		comments.replies($comment.id)
		.success(function(response, status, headers, config) {
			if(response.data.length > 0) {

				$comment.replyloading = false;
				angular.forEach(response.data, function(comment) {
					comment.showreplyform = false;
					comment.replies = [];
					comment.replyloading = false;
					comment.showreplies = false;
					$comment.replies.push(comment)
				})

				$comment.showreplies = true;
			}
		})
		.error(function(response, status, headers, config) {

		})
	}


	$scope.loadComments = function (event, args) {
		$scope.showform = true;
		$scope.sessionExist = $auth.check();
		$scope.post_id = args.post.id;

		if(args.post.comment_count > 0) {

			$scope.loading = true;

			posts.comments(args.post.id)
			.success($scope.commentFetchSuccess)
			.error($scope.commentFetchError)
		}
	}

	$scope.commentFetchSuccess = function (response, status, headers, config) {
		$scope.loading = false;
		if(response.data.length > 0) {

			angular.forEach(response.data, function(comment) {
				comment.showreplyform = false;
				comment.replies = [];
				comment.replyloading = false;
				comment.showreplies = false;
				$scope.comments.push(comment)
			})

			$scope.comments = $scope.comments.filter(function(comment) {
				return comment.has_parent === false;
			})
		}
	}

	$scope.commentFetchError = function (response, status, headers, config) {
		$scope.loading = false;
	}

	$rootScope.$on('load:comments', $scope.loadComments);
	$rootScope.$on('post:loaded', function(event, args) {
		$scope.post_id = args.post.id;
	});
	$rootScope.$on('user:authed', function(event) {
	    $scope.sessionExist = $auth.check();
	})
}])
.directive('postComments', ['$window','$document','$rootScope',
	function($window, $document, $rootScope) {

		return {
			restrict: 'E',
			templateUrl: '/assets/views/blocks/ui/comments.html',
			controller: "CommentCtrl",
			scope: {},
			link: function(scope, el, attr) {
				
			}
		}
	}
]);