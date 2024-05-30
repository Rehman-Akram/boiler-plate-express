# boiler-plate-express-js
Starting express template with user, roles, migrations and seeders.

It includes following

  1. Folder structure, 

  2. Initial setup
     
    2.1. Sequelize and connection with db (postgres)
    2.2. Passport JWT integration 
    2.3. Middlewares Setup (including auth middleware and public routes) 
  
  3. Models: 
   
    3.1. users
    3.2. roles
    3.3. user-roles
  
  4. Migration setup
     
  5 Seeders
  
    5.1 users
    5.2 roles
    5.3 userRoles
    
  6 Modules
  
    6.1. Auth
    6.2. Users
    6.3. Roles
    6.4. UserRoles
    6.5. Shared

  7. CRUD

    7.1. Auth 
    7.2. User

# Getting Started
## Pre-requisites
1. Node 20.11.1
2. Postgres 16

## Steps
1. Install pre-reqs
2. clone repo
3. npm i 
4. Run migrations // To create models  - check package.json for command
5. Run seeders // To seed default user and roles - check package.json for command
6. npm run start (normal)
7. npm run start-dev (with nodemon)
