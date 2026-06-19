<?php

require_once __DIR__ . '/../../config/Database.php';

class Category
{
    private $db;

    public function __construct()
    {
        $this->db = Database::connect();
    }

    public function create($data)
    {
        $stmt = $this->db->prepare(
            "INSERT INTO categories
            (
                name,
                description,
                image
            )
            VALUES
            (
                ?, ?, ?
            )"
        );

        return $stmt->execute([
            $data['name'],
            $data['description'],
            $data['image']
        ]);
    }

    public function getAll()
{
    $stmt = $this->db->prepare(
        "SELECT *
         FROM categories
         ORDER BY id DESC"
    );

    $stmt->execute();

    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

public function findById($id)
{
    $stmt = $this->db->prepare(
        "SELECT *
         FROM categories
         WHERE id = ?"
    );

    $stmt->execute([$id]);

    return $stmt->fetch(PDO::FETCH_ASSOC);
}

public function update($id, $data)
{
    $stmt = $this->db->prepare(
        "UPDATE categories
         SET
            name = ?,
            description = ?,
            image = ?
         WHERE id = ?"
    );

    return $stmt->execute([
        $data['name'],
        $data['description'],
        $data['image'],
        $id
    ]);
}
public function delete($id)
{
    $stmt = $this->db->prepare(
        "DELETE FROM categories
         WHERE id = ?"
    );

    return $stmt->execute([$id]);
}
}