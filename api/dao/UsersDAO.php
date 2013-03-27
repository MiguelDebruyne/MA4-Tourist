<?php
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class UsersDAO
{
    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    private function getUser($id)
    {
        $sql = 'SELECT * FROM users WHERE id= :id';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':id',$id);

        if($stmt->execute())
        {
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }

    public function addUser($user)
    {
        $sql = 'INSERT INTO users(email) VALUES(:email)';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':email',$user['email']);

        if($stmt->execute())
        {
            $id = $this->dbh->lastInsertId();
            return $this->getUser($id);
        }
    }

    public function getUserLocations($userId)
    {
        $sql = 'SELECT users.email, locations.location FROM users
                INNER JOIN usersLocations ON usersLocations.users_id = users.id
                INNER JOIN locations ON usersLocations.locations_id = locations.id
                WHERE users.id = :userId
                ORDER BY users.email';
        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':userId', $userId);

        if($stmt->execute())
        {
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    public function checkEmailExistense($email)
    {
        $sql = 'SELECT email FROM users WHERE email = :email';

        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':email', $email);
        $stmt->execute();

        if( $stmt->rowCount() > 0 )
            return true;
    }
}