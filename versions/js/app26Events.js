var React = require('react');
var ReactDOM = require('react-dom');
var _  = require('lodash');  // learn more at      lodash.com


var AptList = require('./AptList');


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
  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  deleteMessage: function (item){  //need the lodash library to do this for re-render
      var allApts = this.state.myAppointments;
      var newApts = _.without(allApts, item); //takes in an array along with an item you want removed from it.
      this.setState({
          myAppointments: newApts
      }); //setState
  }, //deleteMessage

  render: function() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = { index }
          singleItem = { item }
          whichItem = { item}
          onDelete = {this.deleteMessage} />  //note onDelete is in AptList so this gets us to deleteMessage in this component
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
  } //render
}); //MainInterface================================================================================

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
