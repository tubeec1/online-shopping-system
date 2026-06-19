<?php

require_once __DIR__ . '/../models/Category.php';

class CategoryService
{
    private $categoryModel;

    public function __construct()
    {
        $this->categoryModel =
            new Category();
    }

    public function create()
    {
        $name =
            trim($_POST['name'] ?? '');

        $description =
            trim($_POST['description'] ?? '');

        if (empty($name)) {

            return [
                "success" => false,
                "message" => "Category name is required"
            ];
        }

        $imagePath = null;

        if (
            isset($_FILES['image']) &&
            $_FILES['image']['error'] === 0
        ) {

            $extension =
                pathinfo(
                    $_FILES['image']['name'],
                    PATHINFO_EXTENSION
                );

            $fileName =
                uniqid('category_')
                . time()
                . '.'
                . $extension;

            $uploadDirectory =
                __DIR__
                . '/../../public/storage/uploads/categories/';

            if (!is_dir($uploadDirectory)) {

                mkdir(
                    $uploadDirectory,
                    0777,
                    true
                );
            }

            $uploadPath =
                $uploadDirectory
                . $fileName;

            move_uploaded_file(
                $_FILES['image']['tmp_name'],
                $uploadPath
            );

            $imagePath =
                'storage/uploads/categories/'
                . $fileName;
        }

        $categoryData = [

            "name" => $name,

            "description" => $description,

            "image" => $imagePath
        ];

        $this->categoryModel
            ->create($categoryData);

        return [

            "success" => true,

            "message" =>
                "Category created successfully"
        ];
    }

    public function getAll()
{
    $categories =
        $this->categoryModel
             ->getAll();

    return [

        "success" => true,

        "message" =>
            "Categories Retrieved Successfully",

        "data" =>
            $categories
    ];
}

public function show($id)
{
    $category =
        $this->categoryModel
             ->findById($id);

    if (!$category) {

        return [
            "success" => false,
            "message" => "Category not found"
        ];
    }

    return [

        "success" => true,

        "message" =>
            "Category Retrieved Successfully",

        "data" =>
            $category
    ];
}


public function update($id)
{
    $category =
        $this->categoryModel
             ->findById($id);

    if (!$category) {

        return [
            "success" => false,
            "message" => "Category not found"
        ];
    }

    $name =
        $_POST['name']
        ?? $category['name'];

    $description =
        $_POST['description']
        ?? $category['description'];

    $image =
        $category['image'];

    if (
        isset($_FILES['image']) &&
        $_FILES['image']['error'] === 0
    ) {

        $extension =
            pathinfo(
                $_FILES['image']['name'],
                PATHINFO_EXTENSION
            );

        $fileName =
            uniqid('category_')
            . time()
            . '.'
            . $extension;

        $uploadDirectory =
            __DIR__
            . '/../../public/storage/uploads/categories/';

        if (!is_dir($uploadDirectory)) {

            mkdir(
                $uploadDirectory,
                0777,
                true
            );
        }

        $uploadPath =
            $uploadDirectory
            . $fileName;

        move_uploaded_file(
            $_FILES['image']['tmp_name'],
            $uploadPath
        );

        $image =
            'storage/uploads/categories/'
            . $fileName;
    }

    $categoryData = [

        'name' =>
            $name,

        'description' =>
            $description,

        'image' =>
            $image
    ];

    $this->categoryModel
         ->update(
             $id,
             $categoryData
         );

    return [

        "success" => true,

        "message" =>
            "Category updated successfully",

        "data" =>
            $this->categoryModel
                 ->findById($id)
    ];
}

public function delete($id)
{
    $category =
        $this->categoryModel
             ->findById($id);

    if (!$category) {

        return [
            "success" => false,
            "message" => "Category not found"
        ];
    }

    if (
        !empty($category['image'])
    ) {

        $imagePath =
            __DIR__
            . '/../../public/'
            . $category['image'];

        if (
            file_exists($imagePath)
        ) {

            unlink($imagePath);
        }
    }

    $this->categoryModel
         ->delete($id);

    return [

        "success" => true,

        "message" =>
            "Category deleted successfully"
    ];
}
}