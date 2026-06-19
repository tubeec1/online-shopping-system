<?php

class Config
{
    public static function env($key)
    {
        static $env = null;

        if ($env === null) {
            $env = parse_ini_file(__DIR__ . '/../.env');
        }

        return $env[$key] ?? null;
    }
}

?>