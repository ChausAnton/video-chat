## Run it locally

1. specify video chat server hostname in `lib/urlFactory.js`

2. run `npm install` 

3. run `npm run start`


## Deploy it in a server

* Globally install `gulp-cli` NPM module (may need `sudo`):

1. run `npm install -g gulp-cli`

* Build the production ready browser application:

2. specify video chat server hostname in `lib/urlFactory.js`

3. run `gulp dist`

4. Make sure you are using correct project. Run `firebase projects:list` and choose project to deploy with `firebase use <PROJECT_ID>` command in console

5. run `firebase deploy --only hosting:scheduler`
