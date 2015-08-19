<!doctype html>
<html lang="en-gb" xmlns:ng="http://angularjs.org" ng-app="app">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<meta name="fragment" content="!">
		<meta name="description" content="" id="mt-description">
		<meta name="keywords" content="" id="mt-keywords">
		<meta property="og:site_name" content="Bayelsa Public Square"/>
		<meta property="og:type" content="blog"/>
		<meta name="google-site-verification" content="ab4svSl5hOOFAslsOqHikimA3E8PqBepWRwpIkvdJkc" />
		<base href="/">
		<title>The Bayelsa Public Square</title>

		<!-- External fonts -->
		<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>

		<style type="text/css">
			[ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
			  display: none !important;
			}
		</style>

		<!--[if lt IE 9]>
	    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js"></script>
	    <script src="http://cdnjs.cloudflare.com/ajax/libs/es5-shim/2.2.0/es5-shim.js"></script>
	    <script>
	      document.createElement('ui-select');
	      document.createElement('ui-select-match');
	      document.createElement('ui-select-choices');
	    </script>
	  	<![endif]-->

		<!-- Styleshheets -->
		@if(App::environment() == "local")
		<?= Html::style('assets/css/bootstrap.css') ?>
		<?= Html::style('assets/css/font-awesome.css') ?>
		<?= Html::style('assets/css/admin/animate.css') ?>
		<?= Html::style('assets/css/frontend/frontend.css') ?>
		@else
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
		<?= Html::style('assets/css/frontend/dist.css') ?>
		@endif

		<!-- Google Analytics -->
 		<script>
		  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		  ga('create', 'UA-66104549-1', { 'cookieDomain': 'none' });
		</script>

		<!-- Keen.io -->
		<script type="text/javascript">
		!function(a,b){a("Keen","https://d26b395fwzu5fz.cloudfront.net/3.2.6/keen.min.js",b)}(function(a,b,c){var d,e,f;c["_"+a]={},c[a]=function(b){c["_"+a].clients=c["_"+a].clients||{},c["_"+a].clients[b.projectId]=this,this._config=b},c[a].ready=function(b){c["_"+a].ready=c["_"+a].ready||[],c["_"+a].ready.push(b)},d=["addEvent","setGlobalProperties","trackExternalLink","on"];for(var g=0;g<d.length;g++){var h=d[g],i=function(a){return function(){return this["_"+a]=this["_"+a]||[],this["_"+a].push(arguments),this}};c[a].prototype[h]=i(h)}e=document.createElement("script"),e.async=!0,e.src=b,f=document.getElementsByTagName("script")[0],f.parentNode.insertBefore(e,f)},this);
		</script>

		<script>
	      window.fbAsyncInit = function() {
	        FB.init({
	          appId      : '978479408870735',
	          xfbml      : false,
	          version    : 'v2.4'
	        });
	      };

	      (function(d, s, id){
	         var js, fjs = d.getElementsByTagName(s)[0];
	         if (d.getElementById(id)) {return;}
	         js = d.createElement(s); js.id = id;
	         js.src = "//connect.facebook.net/en_US/sdk.js";
	         fjs.parentNode.insertBefore(js, fjs);
	       }(document, 'script', 'facebook-jssdk'));
	    </script>
	</head>

	<body ng-controller="MainCtrl" ng-init="boot()" ng-cloak data-app-loading="<% appLoading %>">
		<!-- .lg-header -->
		<header class="lg-header visible-md visible-lg">
			<div class="top-bar">
				<div class="container clearfix">
					<nav class="pull-left social">
						<ul>
							<li><a href="https://facebook.com/bayelsapublicsquare" target="_blank"><i class="fa fa-lg fa-facebook"></i></a></li>
							<li><a href="https://twitter.com/ByPublicSquare" target="_blank"><i class="fa fa-lg fa-twitter"></i></a></li>
						</ul>
					</nav>
					<nav class="pull-right">
						<ul class="actions">
							<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signin">Sign In</a></li>
							<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signup">Sign Up</a></li>
							<li ng-cloak ng-show="app.user" class="dropdown" dropdown>
								<a href="" dropdown-toggle>My Account <span class="caret"></span></a>
								<ul class="dropdown-menu account-dropdown">
									<li ng-if="app.user.isadmin"><a href="/admin" target="_blank">Admin Panel</a></li>
									<li><a ui-sref="site.profile">Profile</a></li>
							        <li><a ng-click="logout()">Logout</a></li>
							    </ul>
							</li>
						</ul>
					</nav>
				</div>
			</div>
			<div class="main">
				<div class="container clearfix">
					<div class="pull-left logo">
						<a ui-sref="site.home"><img src="/assets/img/bpslogo3.png"></a>
					</div>
					<div class="pull-left menu">
						<ul class="links clearfix">
							<li ng-repeat="category in categories" ui-sref-active="active" ng-show="categories">
								<a ui-sref="site.section({category: category.slug})" ng-cloak><% category.name %></a>
							</li>
						</ul>
					</div>

					<div class="pull-right menu">
						<ul class="links clearfix">
							<li ui-sref-active="active" ng-show="app.user !== null">
								<a ui-sref="posts.create">Write</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
		<!-- end. lg-header -->

		<!-- .mb-header -->
		<header class="mb-header visible-xs visible-sm">
			<div class="container-fluid clearfix">
				<span class="mobile-nav-toggle" ng-click="toggleMobileMenu()"><i class="fa fa-2x fa-bars"></i></span>
				<div class="logo"><a href="/"><img src="/assets/img/bpslogo2.png"></a><div>
			</div>
		</header>
		<!-- end .mb-header -->

		<!-- mb-menu -->
		<div class="mb-menu visible-xs visible-sm" ng-class="{'open': mobileMenuVisible}">
			<nav class="menu">
				<ul class="sections">
					<li><a href="/">Home</a></li>
					<li ng-repeat="category in categories" ui-sref-active="active">
						<a ui-sref="site.section({category: category.slug})" ng-cloak><% category.name %></a>
					</li>
				</ul>
			</nav>
			<nav class="menu">
				<ul class="links">
					<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signin">Sign In</a></li>
					<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signup">Sign Up</a></li>
					<li ng-if="app.user.isadmin"><a href="/admin" target="_blank">Admin Panel</a></li>
					<li ng-cloak ng-show="app.user"><a ui-sref="site.profile">Profile</a></li>
					<li><a ng-click="logout()">Logout</a></li>
				</ul>
			</nav>
		</div>
		<!-- end .mb-menu -->
 
		<!-- .viewport -->
		<div ui-view class="content"></div>
		<!-- end .viewport -->

		<div data-ng-include="'/assets/views/blocks/footer.html'"></div>

		<!-- bootstrap data -->
		<script type="text/javascript">
			window.Data = window.Data || {}
			window.BPS = window.BPS || {}
			BPS.Config = BPS.Config || {}

			BPS.Config.env = "<?= App::environment() ?>";
			BPS.Config.url = "<?= Config::get('app.url') ?>";
			Data.categories = '<?= json_encode($categories) ?>';
		</script>

		<!-- Scripts -->
		@if(App::environment() == "local")
		<?= Html::script('assets/js/vendor/jquery/jquery.min.js') ?>
		<?= Html::script('assets/js/vendor/libs/underscore.js') ?>
		<?= Html::script('assets/js/vendor/libs/oauth.js') ?>
		<?= Html::script('assets/js/vendor/libs/ua-parse.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-animate/angular-animate.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-resource/angular-resource.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-sanitize/angular-sanitize.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-touch/angular-touch.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-ui-router/angular-ui-router.js') ?>
		<?= Html::script('assets/js/vendor/angular/ngstorage/ngStorage.js') ?>
		<?= Html::script('assets/js/vendor/angular/file-upload/ng-file-upload-all.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/file-upload/ng-file-upload-shim.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js') ?>
		<?= Html::script('assets/js/vendor/angular/onboarding/ng-onboarding.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/oclazyload/ocLazyLoad.js') ?>
		<?= Html::script('assets/js/vendor/angular/angulartics/dist/angulartics.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/angulartics/dist/angulartics-ga.min.js') ?>
		<?= Html::script('assets/js/frontend/interceptor.js') ?>

		<!-- App -->
		<?= Html::script("assets/js/frontend/app.js") ?>
		<?= Html::script("assets/js/frontend/config.js") ?>
		<?= Html::script("assets/js/frontend/config.lazyload.js") ?>
		<?= Html::script("assets/js/frontend/config.router.js") ?>
		<?= Html::script("assets/js/frontend/main.js") ?>
		<?= Html::script("assets/js/admin/services/ui-load.js") ?>
		<?= Html::script("assets/js/frontend/services/auth.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-jq.js") ?>
		<?= Html::script("assets/js/frontend/directives/featured-posts.js"); ?>
		<?= Html::script("assets/js/frontend/directives/newsletter-form.js") ?>
		<?= Html::script("assets/js/frontend/directives/post-comments.js") ?>
		<?= Html::script("assets/js/frontend/directives/report.js") ?>
		<?= Html::script("assets/js/frontend/directives/related-posts.js") ?>
		<?= Html::script("assets/js/frontend/directives/same-as.js") ?>
		<?= Html::script("assets/js/frontend/directives/featured-image-select.js") ?>
 		@else
 		<?= Html::script('assets/js/vendor/libs/oauth.js') ?>
		<?= Html::script('assets/js/frontend/dist/dist.min.js') ?>
		@endif
	</body>
</html>
