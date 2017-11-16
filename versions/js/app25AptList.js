var React = require('react');
var ReactDOM = require('react-dom');

var AptList = require('./AptList');  //we are importing a file, not a library  .js is not required

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      myAppointments: []
    } //return
  }, //getInitialState

  componentDidMount: function() {
    this.serverRequest = $.get('./js/data.json', function(result) {
      var tempApts = result;
      this.setState({
        myAppointments: tempApts
      }); //setState
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    var filteredApts = this.state.myAppointments;
    var filteredApts2 = filteredApts.map(function(item, index) {
      return(
        <AptList key = {index} singleItem = { item } />
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <ul className="item-list media-list">{filteredApts2}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface component

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
