<?php namespace Bps\Data\Repositories\Presenters;

use Prettus\Repository\Presenter\FractalPresenter;
use Bps\Data\Transformers\ReportTransformer; 

class ReportPresenter extends FractalPresenter {

    /**
     * Prepare data to present
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ReportTransformer();
    }
}