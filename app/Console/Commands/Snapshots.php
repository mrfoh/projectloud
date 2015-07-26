<?php namespace Bps\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use League\Flysystem\Filesystem;
use League\Flysystem\Adapter\Local as Adapter;

class Snapshots extends Command {

	/**
	 * The console command name.
	 *
	 * @var string
	 */
	protected $name = 'snapshot';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Create html snapshots of the site.';

	/**
	 * The folder where the snapshots will be saved
	 *
	 * @var string
	 */
	protected $rootFolder = './public/snapshots/';

	/**
	 * Create a new command instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();

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
		$this->info('Starting to generate the HTML snapshots!');

		$sitemapfile = $this->fs->read('sitemap.txt');
		$sitemap = unserialize($sitemapfile);

		$toFolder = $this->rootFolder;

		foreach($sitemap as $obj) {
			$page = $obj['loc'];
			if($page == "/") {
				$page .= 'index';
			}

			if($obj['loc'] == "/")
				$fromUrl = \Config::get('app.url').'/#'.$obj['loc'];
			else
				$fromUrl = \Config::get('app.url').'/#/'.$obj['loc'];

			if($obj['loc'] == "/")
				$tofile = './public/snapshots'.$page.'.html';
			else
				$tofile = './public/snapshots'.$page.'.html';

			$this->info('Processing >>'.$fromUrl.' to '.$tofile);

			$cmd = 'phantomjs phantom-runner.js '.$fromUrl.' > '.$tofile;
			exec($cmd);
		}
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
