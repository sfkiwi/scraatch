## Scraatch

1. Run the project locally
   ```
   dev_appserver.py .
   ```

2. Deploy to AppEngine
   ```
   appcfg.py -A fromscraatch2 --oauth2 update .
   ```

3. Setup Instructions (initial)

   a. Install the [App Engine Python SDK](https://developers.google.com/appengine/downloads)
   
   b. Clone
   ```
   git clone git@github.com:fromscraatch/scraatch.git
   ```
   c. Install dependencies
   ```
   sudo easy_install pip
   pip install -r server/requirements.txt -t server/lib
   npm install
   grunt
   ```
   d. Run the project from the command line
   Visit the application [http://localhost:8080](http://localhost:8080)

   e. Install pylint for server linting
   pip install pylint

4. Available Grunt tasks

   Minifies assets and reminifies on changes
   ```
   grunt
   ```
   Runs the closure linter against the application js
   ```
   grunt gjslint
   ```
   Attempts to fix linter errors
   ```
   grunt fixjsstyle
   ```

5. Adding SCSS/JS

   Add new SCSS files to css/app.scss
   ```
   @import path/to/file
   ```
   Add new JS files to Gruntfile.js and index.html

6. Accessing the API Explorer

   Start your local server
   ```
   dev_appserver.py .
   ```
   Navigate your browser to the Api explorer
   ```
   http://localhost:8080/_ah/api/explorer
   ```
