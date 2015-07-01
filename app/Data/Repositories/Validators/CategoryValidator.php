<?php namespace Bps\Data\Repositories\Validators;

	use Prettus\Validator\Contracts\ValidatorInterface;
	use Prettus\Validator\LaravelValidator;

	class CategoryValidator extends LaravelValidator {

		protected $rules = [
	        ValidatorInterface::RULE_CREATE => [
	            'name' => 'required|unique:categories,name'
	        ],
	        /*
	        ValidatorInterface::RULE_UPDATE => [
	            'title' => ''
	        ]*/
   		];
	}