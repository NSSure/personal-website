# Simple Framework
A frontend framework written in javascript. Simple is a framework that allows for building complete and robust frontend 
applications.  The framework allows for Single-Page applications to be easily developed in one developer friendly ecosystem.

[View JS Documentation](#simple-js)\
[View CSS Documentation](#simple-css)

### Simple JS

Documentation for developing front end application using simple's javascript framework.

### Basic Usage

Simple extend your applications main javascript with the `Application` class. The application class allows for you to configure
options related to your application such as routing, settings, etc.

```javascript
import Application from './simple/application';

export default class App extends Application {
    constructor() {
        super();
    }
}

// Initialize the application.
const app = new App();
```

### Routing

Routes are defined through usage of the `Route` class. When creating an instance of a route your pass the `path` which is the url
the end user uses to navigate to your view, the `templateUrl` which is the path to the markup for the path, and the
`component` which is the code behind file for the route.

```javascript
export default class Route {
    constructor(path, templateUrl, component) {
        // The url the end user uses to navigate to this page/view.
        this.path = path;

        // The path to the file/markup that gets loaded when visting the url.
        this.templateUrl = templateUrl;

        // The component assoicated with the template.
        this.component = component;
    }
}
```

When defining your routes define them as an array of `Route` objects. Below we are defining our routes in a seperate `routes.js`
and then importing the object into our main javascript file. In the `constructor` for your app call the `registerRoutes` function
and pass your imported routes for routing to be enabled.

```javascript
// routes.js
const Routes = [
    new Route("/", "views/docs/home", HomeComponent),
    new Route("development", "views/development", DevelopmentComponent),
    new Route("docs/navigation", "views/docs/navigation", NavigationComponent),
];

export default Routes;

// main.js
import Application from './simple/application';
import Routes from './routes';

export default class App extends Application {
    constructor() {
        super();
        
        // Pass your routes into the registerRoutes functions to enable routing.
        this.registerRoutes(Routes);
    }
}
```

### Data Binding

The Simple JS framework supports both [one way data binding](#one-way-data-binding) with the use of expressions using double curly braces `{{sample}}` as well as [two way data binding](#two-way-data-binding) through the use of HTML form elements.

The follow documentation will be based off the following component definition and the data defined within.

```javascript
// shipping-component.js
export default class ShippingComponent {
    title = 'Manage Location';
    location = {
        address: '101 South Front Street',
        shipping: {
            note: 'Please knock on the front door loudly.'
        }
    };
}
```

#### One Way Data Binding

One way data binding allows you to output component values to the UI through the use of curly brace expressions.

```html
<!-- Display a component level property (non object). -->
<h1>{{title}}</h1>

<!-- Display a property in an object. -->
<div class="form-section">
    <label class "form-label">Address</label>
    <p>{{location.address}}</p>
</div>

<!-- Display a property on a nested object. -->
<div class="form-section">
    <label class "form-label">Shipping Note(s)</label>
    <p>{{location.shipping.note}}</p>
</div>
```

#### Two Way Data Binding

Two way data binding allows you modify component values through UI controls and vice versa.  Adding `s-bind` to an HTML form element will bind that control to the component property.

```html
<div class="form-section">
    <label class "form-label">Address</label>
    <input type="text" class="input-element" s-bind="value" />
</div>
<div class="form-section">
    <label class "form-label">Shipping Note</label>
    <input type="text" class="input-element" s-bind="location.shipping.note" />
</div>
```

### Simple CSS

View the online documentation [here](http://simple.nsgordon.com).

#### Developed by NSSure
