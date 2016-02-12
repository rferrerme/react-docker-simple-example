# react-docker-simple-example
_Web development using Docker, React and RefluxJS, with nginx used as web server._

The idea is to have a minimum project that shows how web development with React+Flux works. nginx is used to serve the web and everything has been dockerized.

Philosophy: [React development guidelines](http://rferrer.me/articles/react-development-guidelines.html)

### Building the containers

If you are not in Linux then set your [docker-machine](https://docs.docker.com/machine/get-started/).

To build the `nginx` container:

* `docker build -t nginx nginx/`

To build the `webapp` container:

* `docker build -t webapp webapp/`

### Running the web server

To launch nginx and keep it running in the background:

* ```docker run -d --name nginx -p 80:80 -v `pwd`/log:/var/log/nginx -v `pwd`/www:/usr/share/nginx/html nginx```

To stop it:

* ```docker stop nginx && docker rm nginx```

### Web application

To install the dependencies:

* ```docker run -it --rm --name webapp -v `pwd`/src:/root/src -v `pwd`/www:/root/www webapp npm install --no-bin-links```

That will create or update the `src/node_modules` folder. That has to be done the first time and every time that dependencies change in `package.json`.

To start the process that will check for changes in the Javascript code and will generate `www/bundle.js`:

* ```docker run -it --rm --name webapp -v `pwd`/src:/root/src -v `pwd`/www:/root/www webapp npm start```

You have to left this running while you do your coding in order to keep the web updated with the latest changes. When updated, it will show new messages like this:

* `3090692 bytes written to ../www/bundle.js (0.59 seconds)`

Use CTRL+C to stop it.

nginx is serving the `www` folder, which contains `index.html`.

To view the application:

* Launch your web browser and connect to port 80, which is where nginx is listening
* Note: If you are not in Linux then the nginx container is running inside a VM and you need to connect to port 80 of the IP address of that VM (use `docker-machine ls` to check it)

To generate a production `bundle.js`:

* ```node_modules/browserify/bin/cmd.js js/app.js -t [envify --NODE_ENV production] | node_modules/uglify-js/bin/uglifyjs -cm -o ../www/bundle.js```

### Some details

If you are not in Linux then the containers run inside a VM and volumes are shared folders. That creates some problems:

* nginx:

   * nginx can have a file corruption problem
   * `sendfile off` has been set to avoid that issue

* watchify:

    * watchify has problems detecting when a file changes so `--poll` is used

* npm:

    * npm has problems creating some symbolic links `--no-bin-links` is used

`packages.json` includes some things that are related to testing, but that is still pending in this example.

Finally, if you have a backend you will have to configure nginx as a proxy to be able to reach it. Add a `location` with a `proxy_pass` directive in `/etc/nginx/conf.d/default.conf` as explained in [NGINX reverse proxy](https://www.nginx.com/resources/admin-guide/reverse-proxy/).