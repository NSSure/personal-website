# Building a Game Engine With TypeScript: Project Creation and Basic Canvas Functionality

Posted by NSSure on July 8th, 2020

## Goal

The goal of this series of posts is to document the development process for a 
basic functional 2d javascript game engine using <a href="https://www.typescriptlang.org" target="blank">TypeScript</a>. 
For now there are no real concrete goals for the finished engine. The only tenative
goals I have is to get the engine to a state where I can develop a game using the engine and to 
document the learning process.

## End Result

Here is the final goal for this post.

<div class="post-banner" style="overflow: hidden; margin-bottom: 15px;">
    <img src="/blog/js-game-engine-post-1/images/initial-engine-stats-dialog.JPG" id="test" style="width: 100%;" />
</div>

### Getting Started

Below is the list of developement packages used in this post.

- typescript
- ts-loader
- webpack
- webpack-cli
- webpack-dev-server

<br>

Here is the project directory structure

```
dist
    styles
        main.css
    bundle.js
    index.html
src
    models
        Point.ts
    main.ts
- package.json
- package-lock.json
- tsconfig.json
- webpack.config.js
```

To get started I needed to create a basic TypeScript development environment to run 
the project through. As well as integrate <a href="https://webpack.js.org/" target="_blank">webpack</a> to create a local dev server and allow for live reloading of source code changes.

In order to initalize TypeScript for my project folder I need to excute
the following command from the root of my project to generate a tsconfig.json file.

<br>

```
tsc --init
```

<br>

After TypeScript is initialized for the project in order to leverage all the powerful features
provided by TypeScript a webpack.config.js file was needed to handle
compiling the TypeScript code with a TypeScript loader. Below is the module rule
needed to use the ts-loader the full webpack.config.js is future down below.

<br>

Here is the module rule required for the ts-loader.

```javascript
{
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/
}
```

<br>

Now with the TypeScript configuration completed it's time to configure a local dev server
using webpack.

Here is the webpack property used to configure the local dev server.
```javascript
devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    port: 9000,
    hot: true,
    inline: true,
    open: true,
    watchOptions: {
        ignored: '/node_modules'
    }
},
```

<br>

Here is the final webpack.config.js file.

```javascript
const path = require('path');
let CopyWebpackPlugin  = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    watchContentBase: true,
    port: 9000,
    hot: true,
    inline: true,
    open: true,
    watchOptions: {
      ignored: '/node_modules'
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
```

<br>

And after I got the webpack configuration set. I needed to add a few new commands
to the scripts section of my package.json file.

<br>

```json
{
    ...
    "scripts": {
        "build": "webpack --config webpack.config.js",
        "watch": "webpack --watch",
        "start": "webpack-dev-server"
    }
    ...
}
```

```html
<html>
    <head>
        <title>Yak Engine</title>
        
        <link rel="stylesheet" href="./styles/main.css">
    </head>
    <body>
        <div id="engine-stats-dialog">test</div>
        <canvas id="engine-canvas"></canvas>
    </body>

    <script src="./bundle.js"></script>
</html>
```

With all the configuration completed now it is possible to run the start command "npm run start"
to get the project open in the browser

<br>

- Run "tsc --init" from project directory
- Run "npm init" from project directory
- Run "npm install ts-loader typescript webpack webpack-cli webpack-dev-server webpack-serve --save-dev"
- Create webpack.config.js
- Add start command to package.json "start": "concurrently \"webpack --config webpack.config.js\" \"webpack-dev-server --open\""
- After initial project setup I run start command to verify that
the project is running correctly
- Use webpack-dev-server to setup local server on port 9000
- Create empty index.html page to make sure start command is working
- With the project now running successfully I add a canvas element to
the index html and set the background color to #181818
- Now that the project is completely setup some basic canvas interactions
for mouse and keyboard
- In the main ts file I get the canvas element by ID so we can attach events to 
the canvas
- After I define a class level property to store the element I get the strict
null check error which means I have to go into the tsconfig.json file and set strict to false

- Now that the project is running and we have a background color set for the canvas we need to make the 
canvas fill the available viewport (show image with blue canvas)
	- If you use css for with and height you get blurry canvas use the (blurry white square image)
	- If you just set width you need to use js for height so we are just going to use js for both

- We are going to use the window resize event to dynamic adjust the width and height of the canvas
- Now that we have the window resize bootstrap lets draw a square center of the canvas to
ensure the resize is working properly
- Side note: When changing the canvas width the canvas is cleared and we need to redraw any previously drawn elements

- Now that we have the canvas created the events bootstraped and the resize working I want to add a 
floating window with some dev information regarding specific canvas events like input etc
with ideas of expansion in the future

- The dialog is now position absolute above the canvas in the top left corner of the viewport
- End of discussion


```javascript
this.$sureToast.show('I am a toast message', 'fa fa-info-circle', {
  interval: 5000,
  enableManualDismiss: true,
  actions: [
    { 
      text: 'OPEN', 
      onClick: (e, toast) => { alert('OPEN CLICKED: ' + toast); } 
    },
    { 
      text: 'DISMISS', 
      onClick: (e, toast) => { alert('CLOSE CLICKED: ' + toast); } 
    }
  ]
});
```

This is the end of the sample blog post.