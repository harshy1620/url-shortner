#### URL Shortener Service
This project is a URL shortener service built using Node.js, Express.js, and MongoDB.

### Functionalities:
## 1.Shorten URL:
- Users can submit a lengthy URL through a POST request.
- The API generates a unique short URL for the submitted original URL and store it in the MongoDB database.

## 2.Access Original URL:
- Users can access the original URL by visiting the generated short URL.

## 3.User Registration and Login:
- Basic user registration and login functionalities are implemented for secure access.
- Passwords are securely hashed using bcrypt.
- Authentication is managed using JSON Web Tokens (JWT).

### Technologies Used
## Backend
- Node.js (version LTS)
- Express.js
## Database
- MongoDB


### Getting Started:

## Prerequisites:
- Node.js (LTS version) installed
- MongoDB installed and running

## Installation:
# Clone the repository:
- git clone https://github.com/your-username/url-shortener.git
- cd url-shortener
# Install dependencies:
- npm install
# Start the application:
- npm start
- The server should be running at http://localhost:8001.

### API Endpoints:
## 1. User Signup 
# Endpoint: http://localhost:8001/signup
# Request body: 
- { "fullName": "your-name", "email": "your-email", "password": "your-password" , "confirmPassword": "re-enter-password"}
# Reponse:
- { message: "User Successfully Registered.Please Log in now." }

## 2. User Signin
# Endpoint: http://localhost:8001/signin
# Request body: 
- {"email": "your-email", "password": "your-password}
# Response: 
- {message:"Logged in successfully.", token: "your-jwt-token"}

## 3. Post Long Url ( To Shorten it)
# Endpoint: http://localhost:8001/
# Request Header
- Authorization: Bearer "your-token"
# Request body:
- {"orignalUrl" : "any-url-you-want-to-shorten"}
# Response: 
- { "originalUrl": "https://example.com/long-url", "shortUrl": "http://localhost:8001/abc123" }

## 4. Redirect to Original Url from using short Url:
# Endpoint: http://localhost:8001/:shortid
# Response: 
- You will be redirected to the original url.

### Contributing
If you'd like to contribute to this project, please follow these steps:

- Fork the repository
- Create a new branch (git checkout -b feature/new-feature)
- Commit your changes (git commit -am 'Add new feature')
- Push to the branch (git push origin feature/new-feature)
- Open a pull request


- Feel free to customize this template based on your specific project structure and additional features. Make sure to replace placeholders like your-username, your-password, and your-secret-key with your actual values.