# Task Manager App
This app was built using ExpressJS(NodeJS framework) and Mongoose(MongoDB library). Testing is done by Jest.
This app is an API with complete CRUD operations for both users and tasks.

## Getting Started
* Initialize git inside an empty directory and clone the remote repository.
```
git init
git clone https://github.com/jjdmolano/node-task-manager.git
```

* Make sure to install the npm package dependencies.
```
npm i
```

* Create a **config** directory in the root directory.
* Create **dev.env** and **test.env** files inside the **config** directory, otherwise the app will fail to run without these env variables.
* Add the following environment variables to both (make sure to remove parentheses in the actual env files):
```
PORT=(3000 or whatever port you want)
JWT_SECRET=(anytextwithoutspace)
MONGODB_URL=(your online or local mongodb url, then for testing you may just add -test at the end to create a separate test database)
SENDGRID_API_KEY=(place your key here)
```

* You are now properly set up and may start testing or running the code.


## Starting the API
* In your terminal, run
```
npm run start
```
to initialize the app on localhost:3000.

* If you're using a local mongodb database, make sure to run
```
mongod
```
on another terminal to connect to the database.
* If you're using an online mongodb database, make sure it's properly set in the env file.


## CRUD for Users
* To create a user, use a **POST** request to the **/users** endpoint (ex. http://localhost:3000/users) with the following JSON body data:
```json
{
    "name": "Example Name",
    "email": "example@example.com",
    "password": "Example123!!",
    "age": "", // this field is optional
}
```

* To login a user, use a **POST** request to the **/users/login** endpoint (ex. http://localhost:3000/users/login) with the following JSON body data:
```json
{
    "email": "example@example.com",
    "password": "Example123!!"
}
```

* To logout the currently logged in user, use a **POST** request to the **/users/logout** endpoint (ex. http://localhost:3000/users/logout).

* To read the logged in user's data, use a **GET** request to the **/users/me** endpoint (ex. http://localhost:3000/users/me). It will return the user's data in a JSON format.

* To read a specific user's data using their _id, use a **GET** request to the **/users/:id** endpoint, where **:id** is the user's _id in the database (ex. http://localhost:3000/users/1234567890). It will return the user's data in a JSON format.

* To update the logged in user's data, use a **PATCH** request to the **/users/me** endpoint (ex. http://localhost:3000/users/me) with the following JSON body data:
```json
{
    "name": "NewExample Name", // you may omit any of the 4 fields if you only want to update specific fields
    "email": "example2@example.com",
    "password": "Example123!!",
    "age": "33"
}
```

* To delete the currently logged in user, use a **DELETE** request to the **/users/me** endpoint (ex. http://localhost:3000/users/me). Note that this also deletes all the deleted user's tasks.

### CRUD For User Avatars
* To upload or update a logged in user avatar, use a **POST** request to the **/users/me/avatar** endpoint (ex. http://localhost:3000/users/me/avatar) with the following **form-data** body using a key of **file** and the picture as the value. Note that the API only accepts **jpg**, **jpeg** and **png** as valid picture formats.

* To read a specific user's avatar using their _id, use a **GET** request to the **/users/:id/avatar** endpoint, where **:id** is the user's _id in the database (ex. http://localhost:3000/users/1234567890/avatar). It will return the user's avatar in a raw Buffer format.

* To delete a logged in user avatar, use a **DELETE** request to the **/users/me/avatar** endpoint (ex. http://localhost:3000/users/me/avatar).


## CRUD for Tasks
* To create a task, use a **POST** request to the **/tasks** endpoint (ex. http://localhost:3000/tasks) with the following JSON body data:
```json
{
    "description": "Example description",
    "completed": false // this field is optional and will default to false when not specified
}
```

* To read the logged in user's tasks, use a **GET** request to the **/tasks** endpoint (ex. http://localhost:3000/tasks?completed=true&sortBy=createdAt_desc). It will return the tasks data in a JSON format.
   As seen in the example above, you may also add queries to your request to return filtered data. Valid queries are **completed**, **limit**, **skip**, and **sortBy**. You may also add **_desc** or **_asc** after the **sortBy** to sort in descending or ascending order.

* To read the logged in user's specific task, use a **GET** request to the **/tasks/:id**, where **:id** is the task's _id in the database endpoint (ex. http://localhost:3000/tasks/987654321). It will return the task data in a JSON format.

* To update a logged in user's task, use a **PATCH** request to the **/tasks/:id**, where **:id** is the task's _id in the database endpoint (ex. localhost:3000/tasks/987654321) with the following JSON body data:
```json
{
    "description": "Example new description", // you may omit any of the 2 fields if you only want to update specific fields
    "completed": true
}
```

* To delete a currently logged in user's task, use a **DELETE** request to the **/tasks/:id**, where **:id** is the task's _id in the database endpoint (ex. localhost:3000/tasks/987654321).


## Running the Jest Tests
* In your terminal, run
```
npm run test
```
to start the tests.
* You may check the details of the tests in the **tests** folder located in the root directory.