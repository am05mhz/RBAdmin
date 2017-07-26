# RBAdmin
Mikrotik RouterOS Administration Web for managing same settings in multiple router boards

## Installation
- Download and extract the files, or do a `git clone`
- Run `php composer.phar update` or just `composer update` to download dependencies

## Limitation
Currently this project uses proprietary users schema to login to the system. 
That is, you need to change the `app\User.php` according to your User schema.