<?php namespace Bps\Data\Repositories\Validators;

	use Prettus\Validator\Contracts\ValidatorInterface;
	use Prettus\Validator\LaravelValidator;

	class ReportValidator extends LaravelValidator {

		protected $rules = [
	        ValidatorInterface::RULE_CREATE => [
	            'user_id' => 'required',
	            'type' => 'required'
	        ],
	        /*
	        ValidatorInterface::RULE_UPDATE => [
	            'title' => ''
	        ]*/
   		];
	}