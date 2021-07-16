
# Summary
 * React components are idempotent functions that describe UI at _any points of time_, just like in a server-rendered app.
 * Virtual DOM.
 * Automatic top-level event delegation.

# Glossary
 * JSX: markup+logic together 
   - JSX is produces Javascript objects under the hood
   - Compiles to a React.createElement() function call, which returns an object
   - The "xml" type can be a react component: <MyComponent prop1="foo" />
     ~ Lowercase tags are DOM elements: e.g., <div .../> <span .../>
     ~ Justified are components: e.g., <ImageButton .../> <DisplayList .../>
 * Elements: Immutable React javascript objects, can be created by JSX
 * Components
   - Independent reusable UI component
   - Javascript function that takes (props) argument
   - There's also a class
   - Made of elements
   - Props are read-only (const): ALL REACT FUNCTIONS MUST BE PURE FUNCTIONS
 * "Controlled Components" are for <input> <textarea> and <select> which hold
     internal state.
   - 'state' is a single source of truth:
     <input type="text" value={this.state.value} onChange={this.handleChange} />

# Structure of a React Program
 * Usually have a single <div id="root"/> node
 * ReactDOM.render(someElement, document.getElementById('root'))
 * Components are pure functions that generate Elements
   - return 'null' to hide the element
 * "Class" components can hold "encasulated" state
   - parents and children cannot be aware of state
   - children can have "state" given to them as props
 * Events are "SyntheticEvent"s and use camelCase
   - In JSX, pass a function for the event handler
     <button onClick={this.handleMyOnClick}/>
   - Cannot return `false` to prevent default beahviour.
     ~ Call `preventDefault`
   - Make the event handler a member function of the Component. (Hence `this` above.)
 * Remember functions are first-class, so a function(props) can return different functions and/or components:
      function Greeting(props) { 
         return (props.x) ? <ThisComponent/> : <ThatComponent/>; 
      }
 * Don't forget that you can `data.map((datum) => Element/Component)` to handles lists and tables.
   ~ Individual items have a "key" prop for identifying them
   ~ Keys must be unique amongst siblings.
   ~ Keys must be "top level"... no nested keys.
   ~ Don't forget that `map` is an expression, and can thus be in JSX.
 * If several components need to share state... lift the state to the nearest common ancestor
 * Express containment through the "children" prop.

# Components
class ... extends React.Component {
    this.props  // immutable
    this.state  // mutable
    
    // Update could by asynchronous...
    this.setState((state, props) => ({
       someAttribute: value, // these are *MERGED* onto the current state
       ...
    }); // Schedules a component update
    
    /********** Functions to override *********/
    constructor(props) { super(props); this.state = {...}; }
    
    // lifecycle methods
    componentDidMount() { /* executed when Component first rendered to DOM */ }
    componentWillUnmount() { /* executed before Component is torn down */ }
    
    render() { return an element; }
    
}

# Setup
@see https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - 
sudo apt -y install nodejs
npm install --save-dev @babel/core@7.10.0 @babel/cli@7.10.0 @babel/preset-env@7.10.0 @babel/preset-react@7.10.0
npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2

react@16.14.0 react-dom@16.14.0
react-hot-loader
npm install @reduxjs/toolkit
npm install redux
npm install react-redux
npm install --save-dev redux-devtools
npx create-react-app my-app --template redux
```
