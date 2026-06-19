<?php

require_once __DIR__ . '/../services/AuthService.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';  

class AuthController
{
    private $authService;

    public function __construct()
    {
        $this->authService =
            new AuthService();
    }

    public function register()
    {
        $data =
            json_decode(
                file_get_contents(
                    "php://input"
                ),
                true
            );

        $result =
            $this->authService
            ->register($data);

        echo json_encode(
            $result
        );
    }

    public function login()
    {
        $data =
            json_decode(
                file_get_contents(
                    "php://input"
                ),
                true
            );

        $result =
            $this->authService
            ->login($data);

        echo json_encode(
            $result
        );
    }

    public function me()
{
    $decoded =
        AuthMiddleware::handle();

    $result =
        $this->authService
        ->me(
            $decoded->email
        );

    echo json_encode(
        $result
    );
}


public function updateProfile()
{

     $decoded =
        AuthMiddleware::handle();

    $result =
        $this->authService
        ->updateProfile(
            $decoded->email
        );
    

    echo json_encode($result);
}
}