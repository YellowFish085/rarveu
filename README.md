# RARVEU

## Introduction

This small project, or merely it's prototype, was created by [Lucas Horand](http://luhof.fr), [Julien Rousset](http://julien-rousset.fr/) and [Theo Costantini](http://theocostantini.com).

It's an AR/RV game in which you'll have to solve some puzzle unsing your voice and moving some objects on the scene. The powers you can use are : THUNDER, FIRE, WATER, WIND.
Try to find which power to use on which object to progress!

To test it, you should :
- use Chrome mobile browser
- then go to the [project url](http://www.theocostantini.com/lab/projects/rarveu/)
- select "Add to Home Screen" option
- launch the game from the Home Screen shortcut

## Dev commands

### Keyboard shortcuts
- s : Switch stereo mode on/off
- p : 'play'    speech event
- w : 'thunder' speech event
- x : 'fire'    speech event
- c : 'water'   speech event
- v : 'wind'    speech event

### Install npm modules
```sh
$ npm install
```

### Watch code changes
```sh
$ gulp
```

### Clean JS with eslint
``` sh
$ ./node_modules/.bin/eslint --fix ./src/js/
```

### Run local server if needed
```
# Run local server on localhost:8080
$ python -m http.server
```

## Requierements
* [node/npm](https://nodejs.org/)
* [gulp](https://github.com/gulpjs/)
* [browserify](http://browserify.org/)
* [python](https://www.python.org/)

## Resources
* Gulpfile inspired by [this example](http://mikevalstar.com/post/fast-gulp-browserify-babelify-watchify-react-build/)

## Credits
- Bgm _"Cylinder Four"_ by **[Chris Zabriskie](http://freemusicarchive.org/music/Chris_Zabriskie/2014010103336111/)**