# Task Manager API

### Authorization

## Authorized Requests
To make an authorized request, add the following header, where {token} is the access token, returned by the service upon successful login or registration:

Authorization:Bearer {token}

## Register

Create a new user by sending POST request to /api/v1/auth/register with properties  name,email and password. The service returns an authorization token, that can be used for requests.


## Login

Login by sending a POST request with email and password to /api/v1/auth/login. The service will respond with an object, containing a standard string token, that can be used for requests.


## Get user details

Send an authorized GET request to /api/v1/auth/me The service will return the record of the user, associated with the passed-in session token.


## Update user details

Send an authorized PUT request to/api/v1/auth/updateddetails.


## Update user password 

Send an authorized PUT request /api/v1/auth/updatepassword.

## Forgot password 

Send  POST request /api/v1/auth/forgot-password


### Tasks

## Get all tasks

Send an authorized GET request to /api/v1/tasks The service will return the record of the user, associated with the passed-in session token.


## Get task by id
Send an authorized GET request to  /api/v1/tasks/{id}


## Make a task 

Send an authorized POST request to /api/v1/tasks  with properties  name, completed(true or false)


## Update a task 

Send an authorized POST request to /api/v1/tasks/{id}


## Delete task 

Send an authorized DELETE request to /api/v1/tasks/{id}



### Admin Override

## Get all users

Send an authorized GET request to /api/v1/users The service will return the record of the users, associated with the passed-in session token.


## Get single user by id


Send an authorized GET request to /api/v1/users/{id}  The service will return user details, associated with the passed-in session token.
 
## Edit user details by id

Send an authorized PUT request to /api/v1/users/{id}  in the body send  only the properties that need to be changed.

## Create user

Create a new user by sending POST request to /api/v1/users with properties  name,email and password.

## Delete user by id

Send an authorized DELETE request to /api/v1/users/{id}. The server will respond with   "success": true and empty user object  "user": {}

