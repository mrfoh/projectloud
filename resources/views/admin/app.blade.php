<!doctype html>
<html lang="en-gb" data-ng-app="app">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<title></title>
		<!-- Stylesheets -->
		@if(App::environment() == "local")
		<?= Html::style('assets/css/bootstrap.css') ?>
		<?= Html::style('assets/css/admin/animate.css') ?>
		<?= Html::style('assets/css/font-awesome.css') ?>
		<?= Html::style('assets/css/admin/simple-line-icons.css') ?>
		<?= Html::style('assets/css/admin/font.css') ?>
		<?= Html::style('assets/css/admin/app.css') ?>
		@else
		<?= Html::style('assets/css/admin/app.css') ?>
		@endif
	</head>

	<body ng-controller="AppCtrl" ng-init="setSession()">
		<div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>

		<script type="text/javascript">
			window.Bps = window.Bps || {};
			//Config
			Bps.Config = Bps.Config || {};
			Bps.Config.env = "{{ App::environment() }}";
			Bps.Config.url = "{{ Config::get('app.url') }}";
			Bps.Config.apiUrl = Bps.Config.url+"/api/";
			Bps.Config.assetUrl = Bps.Config.url+"/assets/js/admin";
			Bps.Config.tplUrl = Bps.Config.url+"/assets/tpl/";
			Bps.User = undefined;
		</script>

		<!-- Scripts -->
		@if(App::environment() == "local")
		<?= Html::script('assets/js/vendor/jquery/jquery.min.js') ?>
		<?= Html::script('assets/js/vendor/libs/underscore.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-animate/angular-animate.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-cookies/angular-cookies.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-resource/angular-resource.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-sanitize/angular-sanitize.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-touch/angular-touch.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-ui-router/angular-ui-router.js') ?>
		<?= Html::script('assets/js/vendor/angular/ngstorage/ngStorage.js') ?>
		<?= Html::script('assets/js/vendor/angular/file-upload/ng-file-upload-all.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/file-upload/ng-file-upload-shim.min.js') ?>
		<?= Html::script('assets/js/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js') ?>
		<?= Html::script('assets/js/vendor/angular/oclazyload/ocLazyLoad.js') ?>

		<!-- App -->
		<?= Html::script("assets/js/admin/app.js") ?>
		<?= Html::script("assets/js/admin/config.js") ?>
		<?= Html::script("assets/js/admin/config.lazyload.js") ?>
		<?= Html::script("assets/js/admin/config.router.js") ?>
		<?= Html::script("assets/js/admin/main.js") ?>
		<?= Html::script('assets/js/admin/interceptors/http.interceptor.js') ?>
		<?= Html::script("assets/js/admin/services/auth.js"); ?>
		<?= Html::script("assets/js/admin/services/ui-load.js") ?>
		<?= Html::script("assets/js/admin/directives/setnganimate.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-butterbar.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-focus.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-fullscreen.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-jq.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-module.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-nav.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-scroll.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-shift.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-toggleclass.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-validate.js") ?>
		<?= Html::script("assets/js/admin/directives/ui-featuredimage.js") ?>
		@else
		<?= Html::script('assets/js/admin/dist/dist.js') ?>
		@endif
	</body>
</html>