<?php
/**
 * Created by JetBrains PhpStorm.
 * User: migueldebruyne
 * Date: 25/03/13
 * Time: 22:04
 * To change this template use File | Settings | File Templates.
 */
require_once WWW_ROOT . DIRECTORY_SEPARATOR . 'classes' . DIRECTORY_SEPARATOR . 'DatabasePDO.php';

class LocationsDAO
{

    public $dbh;

    public function __construct()
    {
        $this->dbh = DatabasePDO::getInstance();
    }

    public function addUserLocation($userId, $locationId)
    {
        $sql = 'INSERT INTO usersLocations(users_id, locations_id)
                VALUES (:userId, :locationId)';

        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':userId', $userId);
        $stmt->bindValue(':locationId', $locationId);

        if($stmt->execute()){
            $usersLocations['id'] = $this->dbh->lastInsertId();
            return $usersLocations;
        }
    }

    public function getRoutes($locationId)
    {
        $sql = 'SELECT locations.location, routes.waypoint FROM routes
                INNER JOIN locations ON locations.id = routes.locations_id_start
                WHERE routes.locations_id_start = :locationId';

        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':locationId', $locationId);

        if($stmt->execute()){
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
    }

    public function getLocationId($locationName)
    {
        $sql = 'SELECT id FROM locations
                WHERE locations.name = :locationName';

        $stmt = $this->dbh->prepare($sql);
        $stmt->bindValue(':locationName', $locationName);

        if($stmt->execute()){
            return $stmt->fetchAll();
        }
    }
}