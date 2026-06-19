<?php

require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../helpers/Response.php';
require_once __DIR__ . '/../helpers/JWTHelper.php';

class AuthService
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new User();
    }

    public function register($data)
    {
        $existingUser =
            $this->userModel
            ->findByEmail(
                $data['email']
            );

        if ($existingUser) {

            return [
                "success" => false,
                "message" => "Email already exists"
            ];
        }

        $profileImage =
            $data['gender'] === 'male'
            ? 'storage/uploads/defaults/male.jpg'
            : 'storage/uploads/defaults/female.jpg';

        $userData = [

            "role_id" => 3,

            "full_name" =>
                $data['fullName'],

            "email" =>
                $data['email'],

            "password" =>
                password_hash(
                    $data['password'],
                    PASSWORD_DEFAULT
                ),

            "gender" =>
                $data['gender'],

            "country" =>
                $data['country'],

            "nationality" =>
                $data['nationality'],

            "profile_image" =>
                $profileImage
        ];

        $this->userModel
            ->create($userData);

        return [
            "success" => true,
            "message" =>
                "User registered successfully"
        ];
    }

    public function login($data)
{
    $user =
        $this->userModel
        ->login($data['email']);

    if (!$user) {

        return [
            "success" => false,
            "message" => "Invalid Email"
        ];
    }

    if (
        !password_verify(
            $data['password'],
            $user['password']
        )
    ) {

        return [
            "success" => false,
            "message" => "Invalid Password"
        ];
    }

    $token =
        JWTHelper::generate($user);

    unset(
        $user['password']
    );

    return [

        "success" => true,

        "message" =>
            "Login Successful",

        "data" => [

            "token" => $token,

            "user" => $user

        ]
    ];
}

public function me($userEmail)
{
    $user =
        $this->userModel
        ->findByEmail($userEmail);

    return [
        "success" => true,
        "message" => "Current User",
        "data" => $user
    ];
}

public function updateProfile($userEmail)
{
    

    $currentUser =
        $this->userModel
             ->findByEmail($userEmail);

    if (!$currentUser) {

        return [
            "success" => false,
            "message" => "User not found"
        ];
    }

    $fullName =
        $_POST['fullName']
        ?? $currentUser['full_name'];

    $gender =
        $_POST['gender']
        ?? $currentUser['gender'];

    $country =
        $_POST['country']
        ?? $currentUser['country'];

    $nationality =
        $_POST['nationality']
        ?? $currentUser['nationality'];

    $password =
        !empty($_POST['password'])
        ? password_hash(
            $_POST['password'],
            PASSWORD_DEFAULT
        )
        : $currentUser['password'];

    $profileImage =
        $currentUser['profile_image'];

 
  

    if (
        isset($_FILES['profileImage']) &&
        $_FILES['profileImage']['error'] === 0
    ) {

        $extension =
            pathinfo(
                $_FILES['profileImage']['name'],
                PATHINFO_EXTENSION
            );

        $fileName =
            uniqid('profile_')
            . time()
            . '.'
            . $extension;

        $uploadDirectory =
            __DIR__
            . '/../../public/storage/uploads/profileImages/';

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
            $_FILES['profileImage']['tmp_name'],
            $uploadPath
        );

        $profileImage =
            'storage/uploads/profileImages/'
            . $fileName;
    }

    $userData = [

        'full_name' =>
            $fullName,

        'password' =>
            $password,

        'gender' =>
            $gender,

        'country' =>
            $country,

        'nationality' =>
            $nationality,

        'profile_image' =>
            $profileImage
    ];

    $this->userModel
         ->updateProfile(
             $userEmail,
             $userData
         );

    $updatedUser =
        $this->userModel
             ->findByEmail($userEmail);

    unset(
        $updatedUser['password']
    );

    return [

        "success" => true,

        "message" =>
            "Profile updated successfully",

        "data" =>
            $updatedUser
    ];
}
}