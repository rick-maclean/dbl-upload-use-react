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
           myAppointments: []
        } //return
    }, //getInitialState

    componentDidMount: function() {
        this.serverRequest = $.get('./js/data.json', function(result) {
            var tempApts = result;
            this.setState({myAppointments: tempApts}); //setState
        }.bind(this)); //$.get AJAX
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        var filteredApts = this.state.myAppointments;
        var filteredAptsRender;
        filteredAptsRender = filteredApts.map(function(item, index) {
            return (
                <li className="pet-item media" key={index}>
                    <div className="pet-info media-body">
                        <div className="pet-head">
                            <span className="pet-head">{this.state.myAppointments[index].petName}</span>
                            <span className="apt-date pull-right">{this.state.myAppointments[index].aptDate}</span>
                        </div>
                        <div className="owner-name"><span className="label-item">Owner:</span>
                        {this.state.myAppointments[index].ownerName}</div>
                        <div className="apt-notes">{this.state.myAppointments[index].aptNotes}</div>
                    </div>                       
                </li>
            ) //return
        }.bind(this) );  //filteredApts.map   
        //NOTE: bind is needed  so 'this' is not the window but is the react object
        return (
            <div className="interface">
                <ul className="item-list media-list">{filteredAptsRender}</ul>
            </div>
        )  //return          //note this is JSX so xml is allowed in here
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