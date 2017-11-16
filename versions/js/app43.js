var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var AptList = require('./AptList');
var AddAppointment = require('./AddAppointment');
var SearchAppointments = require('./SearchAppointments');

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      aptBodyVisible: false,
      sortBy: 'petName',
      sortDirection: 'asc',
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

  toggleAddDisplay: function() {
    var tempVisibility = !this.state.aptBodyVisible;
    this.setState({
      aptBodyVisible: tempVisibility
    }); //setState
  }, //toggleAddDisplay

  addItem: function(tempItem) {
    var tempApts = this.state.myAppointments;
    tempApts.push(tempItem);
    this.setState({
      myAppointments: tempApts
    }); //setState
  }, //addItem

  reOrder: function(subsortBy, subsortDirection) {
    this.setState({
      sortBy : subsortBy,
      sortDirection :subsortDirection
    })

  }, //reOrder

  render: function() {
    var filteredApts = this.state.myAppointments;
    var renderSortBy = this.state.sortBy;
    var renderSortDirection = this.state.sortDirection;
    // Rick added this just to get a better understanding of what values are used
    //in orderBy in next block of code
    for(i=0; i<filteredApts.length; i++)
    {
      console.log(filteredApts[i].petName.toLowerCase());
    }
    //on rendering sort the 1)filteredApts assigned above
    //for each 'item' get for example the value of petName as the value to use for sorting this item
    //eg for the first entry item['petName'] is Buffy
    filteredApts = _.orderBy(filteredApts, function(item){
      return item[renderSortBy].toLowerCase(); }
    , renderSortDirection); //_.orderBy

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
          handleToggle = { this.toggleAddDisplay }
          addApt = { this.addItem }
        />
        <SearchAppointments
          subSortBy = { this.state.sortBy }
          subSortDirection = { this.state.sortDirection }
          onReOrder = { this.reOrder }/>
        <ul className="item-list media-list">{filteredApts}</ul>
      </div>
    ) //return
    //note: we want to show state in our popups in SearchAppointments so add 'props' for that just above
    //this can be seen in the subcomponent like as    this.props.subSortBy   etc
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('petAppointments')
); //render
