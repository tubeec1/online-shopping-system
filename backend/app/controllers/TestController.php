<?php

require_once __DIR__ . '/../helpers/Response.php';

class TestController
{
    public function index()
    {
        Response::success(
            "API Working Successfully"
        );
    }
}