<?php

require_once __DIR__ . '/../app/controllers/TestController.php';
require_once __DIR__ . '/../app/controllers/AuthController.php';
require_once __DIR__ . '/../app/controllers/CategoryController.php';

$routes = [

    'GET' => [

        '/api/test' => [
            TestController::class,
            'index'
        ],

        '/api/auth/me' => [
            AuthController::class,
            'me'
        ],

        '/api/categories' => [
            CategoryController::class,
            'getAll'
        ],

        '/api/categories/show/{id}' => [
            CategoryController::class,
            'show'
        ]

    ],

    'POST' => [

        '/api/auth/register' => [
            AuthController::class,
            'register'
        ],

        '/api/auth/login' => [
            AuthController::class,
            'login'
        ],

        '/api/auth/update-profile' => [
            AuthController::class,
            'updateProfile'
        ],

        '/api/categories/create' => [
            CategoryController::class,
            'create'
        ],
        '/api/categories/update/{id}' => [
            CategoryController::class,
            'update'
        ],

    ],
    'DELETE' => [

    '/api/categories/delete/{id}' => [
        CategoryController::class,
        'delete'
    ]

]

];