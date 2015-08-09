<?php namespace Bps\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Bps\Data\Repositories\Posts;
use Bps\Data\Repositories\Categories;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;

class CreateSitemaps extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'sitemap';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Command description.';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct(Posts $posts, Categories $categories)
	{
		parent::__construct();

		$this->posts = $posts;
		$this->categories = $categories;

		$filesystem = new Filesystem(new Adapter(public_path()));
		$this->fs = $filesystem;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		$this->toxml();
		$this->totxt();
	}

	private function toxml()
	{
		// create new sitemap object
   		$sitemap = \App::make("sitemap");
		//get all categories
		$categories = $this->categories->skipPresenter()->all();
    	// get all posts
	    $posts = $this->posts->skipPresenter()->allPublished();

	    $url = \Config::get('app.url');

	    $sitemap->add($url."/", date("Y-m-d h:i", time()), "1.0", 'daily');
	    $sitemap->add($url."/#!/about", date("Y-m-d h:i", time()), "1.0", 'daily');
	    $sitemap->add($url."/#!/comment-policy", date("Y-m-d h:i", time()), "1.0", 'daily');
	    $sitemap->add($url."/#!/help", date("Y-m-d h:i", time()), "1.0", 'daily');
	    $sitemap->add($url."/#!/sigin", date("Y-m-d h:i", time()), "1.0", 'daily');
	    $sitemap->add($url."/#!/signup", date("Y-m-d h:i", time()), "1.0", 'daily');

	    foreach ($categories as $category)
	    {
	        $sitemap->add($url."/#!/section/".$category->slug, $category->created_at, "1.0", 'daily');
	    }

	    foreach ($posts as $post)
	    {
	        $sitemap->add($url."/#!/article/".$post->slug, $post->created_at, "1.0", 'daily');
	    }

	    if($this->fs->has('sitemap.xml')) {
	    	$this->fs->delete('sitemap.xml');
	    }
	    // generate your sitemap (format, filename)
    	$sitemap->store('xml', 'sitemap');
	}

	public function totxt()
	{
		//sitemap
		$sitemap = [
			'root' => [
				'loc' => "/",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			],
			'about' => [
				'loc' => "/about",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			],
			'comment-policy' => [
				'loc' => "/comment-policy",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			],
			'help' => [
				'loc' => "/help",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			],
			'signin' => [
				'loc' => "/sigin",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			],
			'signup' => [
				'loc' => "/signup",
				'changefreq' => 'daily',
                'priority'   => '1.0'
			]
		];

		//get all categories
		$categories = $this->categories->skipPresenter()->all();
    	// get all posts
	    $posts = $this->posts->skipPresenter()->allPublished();

	    foreach($categories as $category) {
	    	$sitemap[$category->slug] = [
	    		'loc' => "/section/".$category->slug,
	    		'changefreq' => 'daily',
	    		'priority' => '1.0'
	    	];
	    }

	    foreach($posts as $post) {
	    	$sitemap[$post->slug] = [
	    		'loc' => "/article/".$post->slug,
	    		'changefreq' => 'daily',
	    		'priority' => '1.0'
	    	];
	    }

	    $file = serialize($sitemap);

	    if($this->fs->has('sitemap.txt')) {
	    	$this->fs->delete('sitemap.txt');
	    }

	    $this->fs->write("sitemap.txt", $file);
	}

	/**
	 * Get the console command arguments.
	 *
	 * @return array
	 */
	protected function getArguments()
	{
		return [
		];
	}

	/**
	 * Get the console command options.
	 *
	 * @return array
	 */
	protected function getOptions()
	{
		return [
		];
	}

}
