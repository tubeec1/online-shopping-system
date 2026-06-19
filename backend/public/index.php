<?php

require_once __DIR__ . '/../vendor/autoload.php';

header('Content-Type: application/json');

require_once __DIR__ . '/../routes/api.php';

$method =
    $_SERVER['REQUEST_METHOD'];

$uri =
    parse_url(
        $_SERVER['REQUEST_URI'],
        PHP_URL_PATH
    );

$uri =
    str_replace(
        '/online-shopping-system/backend',
        '',
        $uri
    );

if (
    isset(
        $routes[$method][$uri]
    )
) {

    [$controller, $action] =
        $routes[$method][$uri];

    $instance =
        new $controller();

    $instance->$action();

} else {

    $matched = false;

    foreach (
        $routes[$method] ?? []
        as $route => $handler
    ) {

        $pattern =
            preg_replace(
                '/\{[a-zA-Z]+\}/',
                '([0-9]+)',
                $route
            );

        $pattern =
            "#^" .
            $pattern .
            "$#";

        if (
            preg_match(
                $pattern,
                $uri,
                $matches
            )
        ) {

            array_shift(
                $matches
            );

            [$controller, $action] =
                $handler;

            $instance =
                new $controller();

            $instance->$action(
                ...$matches
            );

            $matched = true;

            break;
        }
    }

    if (!$matched) {

        http_response_code(
            404
        );

        echo json_encode([
            "success" => false,
            "message" => "Route Not Found",
            "requested_uri" => $uri
        ]);
    }
}