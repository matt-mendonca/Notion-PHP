<?php 
// Bootstrap
    require_once __DIR__.'/vendor/autoload.php';
    use Symfony\Component\Yaml\Yaml;
    use Notion\Helpers\ContentHelper;

    $app = new Silex\Application();

    $app->register(new Silex\Provider\TwigServiceProvider(), array(
        'twig.path' => __DIR__.'/templates',
    ));

// Debug 
    /*
    $app['debug'] = true;
    error_reporting(E_ALL);
    ini_set('display_errors', TRUE);
    ini_set('display_startup_errors', TRUE);
    */

// Load pages
    $page_registery = ContentHelper::getDirectoryTree(new DirectoryIterator('content'));
    
    foreach ($page_registery as $key => $page_file):
        $page = Yaml::parse("content/{$page_file}"); 

        /*  
            Add trailing slash if not present.
            This will match the non trailing slash and trailing slash routes.
            E.g. /about/ will match /about/ and 301 redirect /about to /about/
            The oppoiste is not true. 
        */
            $page['route'] = substr($page['route'], -1) === '/' ? 
                $page['route'] : 
                $page['route'] . '/';
        
        // Define routes
            $app->get($page['route'], function () use ($app, $page) {
                return $app['twig']->render($page['template'], $page);
            });
    endforeach;

// Error handling
    $app->error(function (\Exception $e, $code) use ($app) {
        switch ($code):
            case 404:
                $message = 'The requested page could not be found.';
                break;
            default:
                $message = 'We are sorry, but something went terribly wrong.';
        endswitch;

        return $app['twig']->render('index.twig', array(
            'page_title' => $code,
            'content_title' => $code,
            'content' => $message
        ));
    });

$app->run();