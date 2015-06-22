<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
		<title>Login - BPS Admin</title>

		<!-- Stylesheets -->
		{!! Html::style('assets/css/bootstrap.css') !!}
		{!! Html::style('assets/css/admin/animate.css') !!}
		{!! Html::style('assets/css/admin/app.css') !!}
	</head>

	<body>
		<div class="viewport">

			<div class="shell animated fadeInDown">
				<div class="logo">{!! Html::image('assets/img/bpslogo2.png') !!}</div>
				<div class="inner">
					@if($message)
					<div class="alert alert-danger">
						{{ $message }}
					</div>
					@endif
					{!! Form::open(['url' => 'accounts/login', 'method' => "post", 'autocomplete' => "off"]) !!}
					<div class="form-group">
						<div class="controls">
							<input type="text" name="email" placeholder="Email" class="form-control">
						</div>
					</div>

					<div class="form-group">
						<div class="controls">
							<input type="password" name="password" placeholder="Password" class="form-control">
						</div>
					</div>

					<div class="form-group">
						<div class="controls">
							<button type="submit" class="btn btn-lg btn-block btn-default bg-lt">Login</button>
						</div>
					</div>
					{!! Form::close() !!}
				</div>
			</div>

		</div>
	</body>
</html>