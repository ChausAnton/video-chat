# appointments-system-back

## get started
- Clone this project

### functions dir
- run (npm install) 
- setup .env file (look for example in .example.env)

#### env variables
- API_KEY this key you can find in firebase console (project settings)	
- MODE could be production or dev
    * in dev mode you don't need Authorization token (you will authorized automatically)
    * in production mode you need Authorization token

### root of the project
- run "firebase emulators:start" in root of the project

### Deployment

1. Make sure you are using correct project. Run `firebase projects:list` and choose project to deploy with `firebase use <PROJECT_ID>` command in console

2. run `firebase deploy`