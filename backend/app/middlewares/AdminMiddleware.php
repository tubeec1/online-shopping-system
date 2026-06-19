<?php

class AdminMiddleware
{
    public static function handle($decoded)
    {
        if (!isset($decoded->role_id)) {

            echo json_encode([
                "success" => false,
                "message" => "Unauthorized"
            ]);

            exit;
        }

        if ($decoded->role_id != 1) {

            echo json_encode([
                "success" => false,
                "message" => "Access Denied. Admin Only"
            ]);

            exit;
        }
    }
}