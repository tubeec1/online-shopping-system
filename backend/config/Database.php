<?php

require_once __DIR__ . '/Config.php';

class Database
{
    private static $connection = null;

    public static function connect()
    {
        if (self::$connection === null) {

            $host = Config::env('DB_HOST');
            $dbname = Config::env('DB_NAME');
            $user = Config::env('DB_USER');
            $pass = Config::env('DB_PASS');

            try {

                self::$connection = new PDO(
                    "mysql:host=$host;dbname=$dbname;charset=utf8",
                    $user,
                    $pass
                );

                self::$connection->setAttribute(
                    PDO::ATTR_ERRMODE,
                    PDO::ERRMODE_EXCEPTION
                );

            } catch (PDOException $e) {

                die(
                    json_encode([
                        "success" => false,
                        "message" => $e->getMessage()
                    ])
                );
            }
        }

        return self::$connection;
    }
}

?>