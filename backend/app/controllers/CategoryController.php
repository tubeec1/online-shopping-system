<?php

require_once __DIR__ . '/../services/CategoryService.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';
require_once __DIR__ . '/../middlewares/AdminMiddleware.php';

class CategoryController
{
    private $categoryService;

    public function __construct()
    {
        $this->categoryService =
            new CategoryService();
    }

    public function create()
    {
        $decoded =
            AuthMiddleware::handle();

        AdminMiddleware::handle(
            $decoded
        );

        $result =
            $this->categoryService
                ->create();

        echo json_encode(
            $result
        );
    }

    public function getAll()
{
    $result =
        $this->categoryService
             ->getAll();

    echo json_encode(
        $result
    );
}

public function show($id)
{
    $result =
        $this->categoryService
             ->show($id);

    echo json_encode(
        $result
    );
}

public function update($id)
{
    $decoded =
        AuthMiddleware::handle();

    AdminMiddleware::handle(
        $decoded
    );

    $result =
        $this->categoryService
             ->update($id);

    echo json_encode(
        $result
    );
}

public function delete($id)
{
    $decoded =
        AuthMiddleware::handle();

    AdminMiddleware::handle(
        $decoded
    );

    $result =
        $this->categoryService
             ->delete($id);

    echo json_encode(
        $result
    );
}
}