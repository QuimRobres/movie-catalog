## Description

A movie catalog App where the user can Sign up in order to rate and comment movies.
Fullstack technical test.

## Technologies

#### Front end:

- React.
- React Router Dom.
- Tailwind.
- Axios.

#### Back end

- Node js.
- Express.
- MongoDB & Mongoose.
- Morgan.
- Passport.
- Bcrypt.

## Installation

Execute the next command in both "movie-catalog-api" and "movie-catalog-app"  folders.

```bash
$ npm install
```

## Running the app

Execute the next command in both "movie-catalog-api" and "movie-catalog-app" 

```bash
# development
$ npm start

```



### Frontend

The main focus has been to break down all elements into components that, on one hand, can be used in different parts of the code, and on the other hand, can be reused in other potential projects. 

```react
	<Input
        type="text"
        handleChange={(value) => handleFormChange(value, "name")}
        label="Full Name"
        errorMessage='Error on this field'
      />
```

Building on that idea, I've kept the pages to a minimum, using React's state to render different components and forms depending on user actions. 

Future improvements: refactor the "printMovieList" and "printComments" functions into components so that they can be used with other types of data beyond movies/comments.



#### React Router Routes (React APP)

| Path                    | Component  | Permissions               | Behavior                                                     |
| ----------------------- | ---------- | ------------------------- | ------------------------------------------------------------ |
| /login                  | LoginForm  | anon only  <AnonRoute>    | Login form, link to signup, navigate to homepage after login. |
| /signup                 | SignupForm | anon only  <AnonRoute>    | Signup form. Creates user, logs in and then navigate to homepage. |
| /logout                 | Home       | user only  <PrivateRoute> | Logout the user and navigates to /Auth page.                 |
| /movies                 | Home       | user only  <PrivateRoute> | Gets the list of movies on the Data Base.                    |
| /movies/:id/rate        | Home       | user only <PrivateRoute>  | Rates a movie.                                               |
| /movies/:id/comments    | Comments   | user only <PrivateRoute>  | Gets all the comments of a movie.                            |
| /movies/:id/postComment | Comments   | user only <PrivateRoute>  | Post a new comment for a movie.                              |

#### Services

- Auth services

  - auth.login(user).
  - auth.signup(user).
  - auth.logout().
- Movie services

  - getMovies().
  - getMovieComments(id).
  - postComment(id, comment).
  - rateMovie(id, rate).

- General services
  - formatDate(date)

-----------------------------------------------------------------



### Backend

Due to the requirements and the need for the app to be scalable, I have made the following decisions:

- **Express.js:** Because of its flexibility and scalability.
- **MongoDB:** Due to the data structure and flexibility when making modifications.
- **Authentication:** For its simplicity and the possibility of adding other authentication methods in the future (Google, Facebook, etc.).

```javascript
{
    name: { type: String},
    email: {type: String, required: true, unique: true},
   	password: {type: String, required: true, minLength: 6},  
}
```

#### Movie model 

```javascript
{
  title: { type: String, required: true },
  synopsis: { type: String, required: true },
  cover: { type: String, required: true },
  averageRate: { type: Number, required: true },
  rateList: [rateSchema],
  comments: [commentsSchema],
}
```

#### Comment Model

```javascript
{
    title: { type: String },
    comment: { type: String, required: true },
    userId: { type: String, required: true },
  }
```

#### Rate model 

```javascript
{
  userId: { type: String, required: true },
  rate: { type: Number, required: true },
}
```



#### API Endpoints (backend routes)

| Method | URL                         | Request Body             | Success Status | Error Status | Description                                                  |
| ------ | --------------------------- | ------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| post   | /api/login                  | {email, password}        | 200            | 401          | Check if fields not empty, if user exist and if the password matches, then returns user. |
| POST   | /api/logout                 |                          | 204            | 400          | Logs out the user.                                           |
| POST   | /api/signup                 | {name,  email, password} | 200            | 404          | Check if fields not empty, checks password length, check if user exists, then hashPass and create user. |
| GET    | /api/movies                 |                          | 200            | 500          | Returns all movies                                           |
| GET    | /api/movies/:id             | {id}                     | 200            | 404          | Returns a specific movie.                                    |
| POST   | /api/movies/:id/postComment | {comment, title, userId} | 200            | 500          | Adds a comment to a movie.                                   |
| POST   | /api/movies/:id/rate        | {rate, userId}           | 200            | 500          | Check if the userId already rated the movie, if not adds the rate to the rate list and calculates new average. |
