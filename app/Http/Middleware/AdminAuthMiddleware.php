<?php namespace Bps\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;

class AdminAuthMiddleware {

	/**
	 * The Guard implementation.
	 *
	 * @var Guard
	 */
	protected $auth;

	/**
	 * Create a new filter instance.
	 *
	 * @param  Guard  $auth
	 * @return void
	 */
	public function __construct(Guard $auth)
	{
		$this->auth = $auth;
	}

	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		//If user is not authenticated
		if(!$this->auth->check()) {
			return redirect()->guest('admin/auth');
		}
		else {
			//check if user is admin
			if(!$this->auth->user()->isAdmin()) {
				return redirect()->guest('/');
			}
		}

		return $next($request);
	}

}
