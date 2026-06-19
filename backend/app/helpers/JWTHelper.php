<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JWTHelper
{
    private static $secret =
    "miro_market_online_shopping_system_super_secure_jwt_secret_key_2026";

    public static function generate($user)
    {
        $payload = [

            "user_id" =>
                $user['id'],

            "role_id" =>
                $user['role_id'],

            "email" =>
                $user['email'],

            "iat" =>
                time(),

            "exp" =>
                time() + (60 * 60 * 24)
        ];

        return JWT::encode(
            $payload,
            self::$secret,
            'HS256'
        );
    }

   

    public static function verify($token)
{
    try {

        return JWT::decode(
            $token,
            new Key(
                self::$secret,
                'HS256'
            )
        );

    } catch (Exception $e) {

        return false;
    }
}
}