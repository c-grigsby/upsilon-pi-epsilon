# UPE Server

This server-side application is the backend for the Upsilon Pi Epsilon (UPE) web application for CCU

## Project Details

- Developed with Express.js
- Delivers contact form data to UPE via an automated emailing system
- OAuth 2.0
- Google Cloud platform

## Installation

```
$ npm install
```

## Running the App

Navigate in the terminal to the 'backend' directory and execute

```bash
# development
$ npm run dev

# production mode
$ npm run start
```
## Configuring

 This application utilizes dotenv to host environment variables. Add a file named config.env to the 'config' directory, then include the contents of the config.env.example found within this folder

## Deploying to Heroku

To deploy to Heroku manually you will need to push the 'backend' subdirectory specifically. When ready to deploy, navigate to the root level of the project in the terminal and execute:

```bash
# create a new branch 'deploy' containing only the backend subdirectory content
$ git subtree split --prefix backend -b deploy

# push the newly created branch to Heroku
$ git push heroku deploy:master
```

Alternatively, this process can be automated via Heroku directly