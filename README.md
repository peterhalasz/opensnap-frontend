# OpenSnap - Open-source Snake AI Platform `(frontend)`

### Install Dependencies

[Node Package Manager][npm]


```
npm install -g bower
npm install -g gulp-cli
```

After installed npm, bower and gulp, go to project directory and execute:

```
npm install
```

npm install will also trigger "bower install"

After that, you should find out that you have
two new folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the Angular framework files

### Fill in settings
Copy app/template_constants.js contents to app/constants.js, then fill in settings.

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
gulp
```

Now browse to the app at [`localhost:8000`][local-app-url].




[angularjs]: https://angularjs.org/
[bower]: http://bower.io/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
