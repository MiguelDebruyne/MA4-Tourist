<?php
define('WWW_ROOT', dirname(__FILE__) . DIRECTORY_SEPARATOR);

require_once WWW_ROOT . 'includes' . DIRECTORY_SEPARATOR . 'functions.php';
require_once WWW_ROOT . 'classes' . DIRECTORY_SEPARATOR . 'Config.php';
require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'UsersDAO.php');
require_once(WWW_ROOT . 'dao' . DIRECTORY_SEPARATOR . 'LocationsDAO.php');
require_once(WWW_ROOT . 'Slim' . DIRECTORY_SEPARATOR . 'Slim.php');


$app = new Slim();

$app->post('/users/add', 'addUser');
$app->get('/users/locations/:userid', 'getUserLocations');

$app->get('/locations/:userid/:locationid/add', 'addUserLocation');

$app->run();

function addUser()
{
    $request = Slim::getInstance()->request();
    $usersDAO = new UsersDAO();
    $email = $request->post('email');

    $emailPattern = "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/";
    $isEmailUsed = $usersDAO->checkEmailExistense($email);

    if( empty($email) )
        $errorMessages['email'] = 'Field is empty';

    else if( preg_match($emailPattern, $email) < 1 )
        $errorMessages['email'] = 'Format is not correct';

    else if( $isEmailUsed )
        $errorMessages['email'] = 'Email has already been used';

    if( isset($errorMessages) ){
        echo json_encode($errorMessages);
    }
    else {
        $result = $usersDAO->addUser($request->post());
        echo json_encode($result);
    }
}

function addUserLocation($userId, $locationId)
{
    $locationsDAO = new LocationsDAO();

    if( !empty($locationId) ){
        $result = $locationsDAO->addUserLocation($userId, $locationId);
        if(isset($result)) echo true;
    }
}

function getUserLocations($userId)
{
    $userDAO = new UsersDAO();
    $result = $userDAO->getUserLocations($userId);

    if( isset($result) ){
        echo json_encode($result);
    }
}
