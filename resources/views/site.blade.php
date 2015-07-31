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
		<title>The Bayelsa Public Square</title>

		<!-- External fonts -->
		<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Lato' rel='stylesheet' type='text/css'>

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
	</head>

	<body ng-controller="MainCtrl" ng-init="boot()" ng-cloak data-app-loading="<% appLoading %>">
		<!-- .lg-header -->
		<header class="lg-header visible-md visible-lg">
			<div class="top-bar">
				<div class="container clearfix">
					<nav class="pull-right">
						<ul class="actions">
							<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signin">Sign In</a></li>
							<li ng-cloak ng-show="app.user == null"><a ui-sref="site.signup">Sign Up</a></li>
							<li ng-cloak ng-show="app.user" class="dropdown" dropdown>
								<a href="" dropdown-toggle>My Account <span class="caret"></span></a>
								<ul class="dropdown-menu account-dropdown">
									<li ng-if="app.user.isadmin"><a href="/admin" target="_blank">Admin Panel</a></li>
									<li><a href="">Profile</a></li>
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
					<li><a ng-click="openAuthModal(true)">Sign Up/Sign In</a></li>
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
			Data.categories = '<?= json_encode($categories) ?>';
		</script>

		<!-- Scripts -->
		@if(App::environment() == "local")
		<?= Html::script('assets/js/frontend/dist/dist.js') ?>
 		@else
		<?= Html::script('assets/js/frontend/dist/dist.js') ?>
		@endif
	</body>
</html>
