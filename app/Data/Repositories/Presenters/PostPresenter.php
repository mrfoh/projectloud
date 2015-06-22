<?php namespace Bps\Data\Repositories\Presenters;

use Prettus\Repository\Presenter\FractalPresenter;
use Bps\Data\Transformers\PostTransformer; 

class PostPresenter extends FractalPresenter {

    /**
     * Prepare data to present
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new PostTransformer();
    }
}