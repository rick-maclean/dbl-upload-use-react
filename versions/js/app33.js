var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      aptBodyVisible: false, //so by default the form is hidden
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

  deleteMessage: function(item) {
    var allApts = this.state.myAppointments;
    var newApts = _.without(allApts, item);
    this.setState({
      myAppointments: newApts
    }); //setState
  }, //deleteMessage

  mainToggleAddDisplay: function () {
    var tempVisibility = !this.state.aptBodyVisible;  //note get the opposite of this bool
    this.setState( {      aptBodyVisible: tempVisibility    }); //setState
  }, //mainToggleAddDisplay

  mainAddItem: function(tempItem) {
    var tempApts = this.state.myAppointments;
    tempApts.push(tempItem);
    this.setState( {      myAppointments : tempApts    }); //setState
  }, //mainAddItem

  render: function() {
    var filteredApts = this.state.myAppointments;
    filteredApts = filteredApts.map(function(item, index) {
      return(
        <AptList key = { index }
          singleItem = { item }
          whichItem = { item }
          onDelete = { this.deleteMessage } />
      ) //return
    }.bind(this)); //filteredApts.map
    return (
      <div className="interface">
        <AddAppointment 
          bodyVisible = { this.state.aptBodyVisible }
          handleToggle = { this.mainToggleAddDisplay }
          addApt = {this.mainAddItem}
        /> 
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return    
    //Note AddAppointment is a call to the component AddAppointment
    // we will pass a parameter bodyVisible just like we have parameters for AptList above

  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
