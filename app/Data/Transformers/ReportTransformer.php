<?php namespace Bps\Data\Transformers;
	
	use Bps\Data\Models\Report;
	use League\Fractal\TransformerAbstract;

	class ReportTransformer extends TransformerAbstract {

		public function transform(Report $report)
	    {
	        return [
	            'id' => $report->id,
	            'user' => ($report->user) ? [
	            	'id' => $report->user->id,
	            	'name' => $report->user->name,
	            	'username' => $report->user->username
	            ] : null,
	            'type' => $report->type,
	            'comment' => $report->comment,
	            'ctx' => [
	            	'id' => $report->reportable->id,
	            	'user' => ($report->reportable->user) ? [
	            		'id' => $report->reportable->user->id,
	            		'name' => $report->reportable->user->name,
	            		'username' => $report->reportable->user->username
	            	] : null,
	            	'body' => $report->reportable->body,
	            	'created_at' => $report->reportable->created_at,
	            	'updated_at' => $report->reportable->updated_at
	            ],
	            'status' => $report->status,
	            'created_at' => $report->created_at,
	            'updated_at' => $report->updated_at
	        ];
	    }
	}