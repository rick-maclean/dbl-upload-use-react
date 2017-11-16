var React = require('react'); //need react library
//but not react-DOM since I am not outputting anything to the DOM

//create a new class by taking items in our filteredApts function
var AptList = React.createClass({
  //note we need at least a render function
  render: function() {
    //Note we have no access to State so need props
    // so instead of this.state.myAppointments[index].petName
    // we have
    return(
        <li className="pet-item media">
          <div className="pet-info media-body">
            <div className="pet-head">
              <span className="pet-name">{this.props.singleItem.petName}</span>
              <span className="apt-date pull-right">{this.props.singleItem.aptDate}</span>
            </div>
            <div className="owner-name"><span className="label-item">Owner:</span>
            {this.props.singleItem.ownerName}</div>
            <div className="apt-notes">{this.props.singleItem.aptNotes}</div>
          </div>
        </li>
      ) //return
  }
}); //AptList compontent
