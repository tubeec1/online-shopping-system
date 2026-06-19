<?php

require_once __DIR__ . '/../helpers/JWTHelper.php';

class AuthMiddleware
{
    public static function handle()
    {
        $headers = getallheaders();

        if (
            !isset($headers['Authorization'])
        ) {

            echo json_encode([
                "success" => false,
                "message" => "Token Required"
            ]);

            exit;
        }

        $token = str_replace(
            'Bearer ',
            '',
            $headers['Authorization']
        );

        $decoded =
            JWTHelper::verify(
                $token
            );

        if (!$decoded) {

            echo json_encode([
                "success" => false,
                "message" => "Invalid Token"
            ]);

            exit;
        }

        return $decoded;
    }
}