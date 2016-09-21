# react-docker-simple-example
_Web development using Docker Compose, React and RefluxJS, with nginx used as web server._

The idea is to have a minimum project that shows how web development with React+Flux works. nginx is used to serve the web and everything has been dockerized.

**React guidelines**:

* Read this: [React development guidelines](http://rferrer.me/articles/react-development-guidelines.html)

### Build & Run container

You will need to install [Docker](https://www.docker.com/products/overview) and [Docker Compose](https://docs.docker.com/compose/install/). If you are not in Linux then set your [Docker Machine](https://docs.docker.com/machine/get-started/).

To build and run the "nginx-react" container:

* `docker-compose up -d`

(it will run in the background, controlled by [Supervisor](http://supervisord.org))

To check the logs:

* `docker-compose logs -ft`

To stop it (and remove it):

* `docker-compose down`

(the container has no state so it can be destroyed and recreated every time)

### Web application

To install the dependencies:

* ```docker-compose exec nginx-react npm install --no-bin-links```

That will create or update the `src/node_modules` folder. That has to be done the first time and every time that dependencies change in `package.json`.

To start the process that will check for changes in the Javascript code and will generate `www/bundle.js`:

* ```docker-compose exec nginx-react npm start```

You have to leave it running while you do your coding in order to keep the web updated with the latest changes. Once a new `www/bundle.js` is generated, it will show a new message like this:

* `4178582 bytes written to ../www/bundle.js (5.62 seconds)`

(_Tip_: use CTRL+C to stop it)

nginx is serving the `www` folder, which contains the `index.html` file.

To view the application:

* Launch your web browser and connect to port 80, which is where nginx is listening
* _Note_: if you are not in Linux then the nginx container is running inside a VM and you need to connect to port 80 of the IP address of that VM (use `docker-machine ls` to check it)

To generate a production `www/bundle.js`:

* ```docker-compose exec nginx-react bash -c "node_modules/browserify/bin/cmd.js js/app.js -t [envify --NODE_ENV production] | node_modules/uglify-js/bin/uglifyjs -cm -o ../www/bundle.js"```

### Some details

If you are not in Linux then the containers run inside a VM and volumes are shared folders. That could create some problems:

* nginx:

   * nginx can have a file corruption problem
   * `sendfile off` has been set to avoid that issue

* watchify:

    * watchify has problems detecting when a file changes so `--poll` is used
    * If you don't see any new `... written to ../www/bundle.js` messages after changes in your javascript code remember that you will have to use CTRL+C to stop it and run it again in order to refresh `www/bundle.js`

* npm:

    * npm has problems creating some symbolic links so `--no-bin-links` is used

Finally, if you have a backend you will have to configure nginx as a reverse proxy to be able to reach it:

* Add a `location` with a `proxy_pass` directive in `nginx/default.conf` (there is already an example there)

* Then reload the configuration file: `docker-compose exec nginx-react nginx -s reload`