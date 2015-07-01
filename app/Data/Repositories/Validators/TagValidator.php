<?php namespace Bps\Data\Repositories\Validators;

	use Prettus\Validator\Contracts\ValidatorInterface;
	use Prettus\Validator\LaravelValidator;

	class TagValidator extends LaravelValidator {

		protected $rules = [
	        ValidatorInterface::RULE_CREATE => [
	            'name' => 'required|unique:tags,name'
	        ],
	        
	        ValidatorInterface::RULE_UPDATE => [
	            'name' => 'required'
	        ]
   		];
	}