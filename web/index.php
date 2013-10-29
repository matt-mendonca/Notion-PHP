<?php 
// Bootstrap
    require_once __DIR__.'/../vendor/autoload.php';
    use Symfony\Component\Yaml\Yaml;

    $app = new Silex\Application();

    $app->register(new Silex\Provider\TwigServiceProvider(), array(
        'twig.path' => __DIR__.'/templates',
    ));

// Routes
    $app->get('/', function () use ($app) {
        $page = Yaml::parse('content/index.yml');
        return $app['twig']->render('index.twig', $page);
    });

// Error handling
    $app->error(function (\Exception $e, $code) use ($app) {
        switch ($code):
            case 404:
                $message = 'The requested page could not be found.';
                break;
            default:
                $message = 'We are sorry, but something went terribly wrong.';
        endswitch;

        return $message;
    });

$app->run();