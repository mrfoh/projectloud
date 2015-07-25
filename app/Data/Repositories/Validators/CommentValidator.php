<?php namespace Bps\Data\Repositories\Validators;

	use Prettus\Validator\Contracts\ValidatorInterface;
	use Prettus\Validator\LaravelValidator;

	class CommentValidator extends LaravelValidator {

		protected $rules = [
	        ValidatorInterface::RULE_CREATE => [
	            'body'  => 'required',
	            'post_id' => 'required'
	        ],
	        /*
	        ValidatorInterface::RULE_UPDATE => [
	            'title' => ''
	        ]*/
   		];
	}