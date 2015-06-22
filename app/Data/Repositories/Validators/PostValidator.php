<?php namespace Bps\Data\Repositories\Validators;

	use Prettus\Validator\Contracts\ValidatorInterface;
	use Prettus\Validator\LaravelValidator;

	class PostValidator extends LaravelValidator {

		protected $rules = [
	        ValidatorInterface::RULE_CREATE => [
	            'title' => 'required|unique:posts,title',
	            'body'  => 'min:3',
	        ],
	        /*
	        ValidatorInterface::RULE_UPDATE => [
	            'title' => ''
	        ]*/
   		];
	}