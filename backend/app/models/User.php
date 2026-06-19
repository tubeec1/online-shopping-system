<?php

require_once __DIR__ . '/../../config/Database.php';

class User
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }


    public function findByEmail($email)
{
    $stmt = $this->db->prepare(
        "SELECT
            users.id,
            users.role_id,
            users.full_name,
            users.email,
            users.password,
            users.gender,
            users.country,
            users.nationality,
            users.profile_image,
            users.status,
            users.created_at,
            roles.name AS role_name
        FROM users
        INNER JOIN roles
        ON users.role_id = roles.id
        WHERE users.email = ?"
    );

    $stmt->execute([$email]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO users
            (
                role_id,
                full_name,
                email,
                password,
                gender,
                country,
                nationality,
                profile_image
            )
            VALUES
            (
                ?,?,?,?,?,?,?,?
            )"
        );

        return $stmt->execute([
            $data['role_id'],
            $data['full_name'],
            $data['email'],
            $data['password'],
            $data['gender'],
            $data['country'],
            $data['nationality'],
            $data['profile_image']
        ]);
    }

    public function login($email)
{
    $stmt = $this->db->prepare(
        "SELECT
            users.*,
            roles.name AS role_name
        FROM users
        JOIN roles
            ON roles.id = users.role_id
        WHERE users.email = ?"
    );

    $stmt->execute([$email]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

public function updateProfile($email, $data)
{
    $stmt = $this->db->prepare(
        "UPDATE users
         SET
            full_name = ?,
            password = ?,
            gender = ?,
            country = ?,
            nationality = ?,
            profile_image = ?
         WHERE email = ?"
    );

    return $stmt->execute([
        $data['full_name'],
        $data['password'],
        $data['gender'],
        $data['country'],
        $data['nationality'],
        $data['profile_image'],
        $email
    ]);
}
}