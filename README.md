# React Elm Component

### Embed an Elm App within a React Component

Inspiration was heavily taken from [react-elm-components](https://github.com/cultureamp/react-elm-components). This package takes advantage of React Hooks to provide a lightweight (282 bytes) solution.


### Usage With Webpack / Parcel

After you have compiled an Elm program to JavaScript, you can embed it in React like this:

```javascript
import ElmComponent from 'react-elm-component'
import { Elm } from './ElmApp.elm'

function render() {
	return <ElmComponent app={Elm.Todo} />
}
```


### Flags

Sometimes you want to give your Elm program some **flags** on start up. For example, maybe your `Todo` module needs to get an array of todos. You would write something like this:

```javascript
import ElmComponent from 'react-elm-component'
import { Elm } from './ElmApp.elm'

function render() {
	var flags = { todos: ["Get Milk", "Do Laundry"] };
	return <ElmComponent app={Elm.Todo} flags={flags} />
}
```

These flags will be given to the Elm program, allowing you to do some setup work in JS first.


### JavaScript & Elm Interop

As your Elm program gets fancier, you will probably need to interact with JavaScript. We do this with [**ports**](https://guide.elm-lang.org/interop/ports.html). Think of these as holes in the side of an Elm program that let you pass messages back-and-forth.

So maybe we extend our `Todo` app to allow outsiders to register new tasks through the `todos` port. And maybe we also expose `numActiveTodos` so that the outsider can know how much work you have left. You would set it up like this:

```javascript
import ElmComponent from 'react-elm-component'
import { Elm } from './ElmApp.elm'

function render() {
	return <ElmComponent app={Elm.Todo} ports={setupPorts} />
}

function setupPorts(ports) {
	ports.numActiveTodos.subscribe(function(n) {
		console.log(n);
	});

	ports.todos.send("Invent the Universe");
	ports.todos.send("Bake an Apple Pie");
}
```

In the `setupPorts` function, we first subscribe to the `numActiveTodos` port. Whenever the number of active todos changes, we will run that function and log the number on the console. After that, we send two values through the `todos` port. This will add both of these into the model *and* trigger the `numActiveTodos` callback twice.
