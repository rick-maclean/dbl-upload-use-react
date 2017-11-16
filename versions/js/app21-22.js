var React = require('react');
var ReactDOM = require('react-dom');

/*create our first component
To create a class, we pass along a JavaScript object. React has a bunch of methods that you can use to
take care of things. At the very least, you need to pass along a method called render.
Render returns a list of React components that's gonna get converted into HTML.
It's also a good idea to add a bunch of comments throughout your application.
*/
var MainInterface = React.createClass({
    getInitialState: function() {
        return {
            title: 'Pet Appointments',
            show: true
        } //return
    }, //getInitialState

    render: function() {
        var showTitle;
        if (this.state.show) { showTitle = 'Rick';}
        //use this with react chrome plugin to see how CSS styles change things.
        var displayList = {
            display: this.state.show ? 'block':'none',
            color: 'red'
        }
        return (
            <div className="interface">
                <h1>{ showTitle} { this.state.title }</h1>
                <ul style={displayList}>
                    <li>Misty 3:30 PM</li>
                    <li>Bonnie 7:95 AM</li>
                    <li>Jemimah 2:22 PM</li>
                </ul>
            </div>
        )  //note this is JSX so xml is allowed in here
    } //render
}); //MainInterface

/*
Now in order for this to make it into our page, we'll need to use the render method of the
ReactDOM object. This method needs a couple of things. First is the element we want to render,
and then where we want to put it. Now the object we want to render is our MainInterface. Because we're
using something that looks like XML, my closing tag will have this extra slash next to it. We also need
to tell React where this is gonna go in our HTML. So I'm gonna use a document getElementById command,
and then look for a tag with an ID of petAppointments.
*/
//render our MainInterface,  where to put in our html is petAppointments
ReactDOM.render(
    <MainInterface />,
    document.getElementById('petAppointments')  // <div id="petAppointments"></div> was added to index.html
); //render

//also index.html has this added    <script src="js/app.js"></script>