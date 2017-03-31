<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', 'Mikrotik@index');
$app->get('/login', ['as' => 'login', 'uses' => 'Login@index']);
$app->get('/logout', ['as' => 'logout', 'uses' => 'Login@logout']);

$app->get('/boards', 'Mikrotik@boards');

$app->get('/urls', ['as' => 'urls', 'uses' => 'Mikrotik@urls']);

$app->get('/key', function(){
	return str_random(32);
});

$app->post('/login', 'Login@authenticate');