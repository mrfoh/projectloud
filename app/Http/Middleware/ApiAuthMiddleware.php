<?php namespace Bps\Http\Middleware;

use Closure;

class ApiAuthMiddleware {

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		$authorization = $request->header('Authorization');

		echo $authorization;
		
		return $next($request);
	}

}
