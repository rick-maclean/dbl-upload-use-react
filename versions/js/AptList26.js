var React = require('react');

var AptList = React.createClass({
  handleDelete: function(){ 
    //this functions just passes on to the Main component what we want to do because we do not have access
    //to the state
    //onDelete and whichItem are props that need to be created (need to be created in our app.js file for AptList)
    this.props.onDelete(this.props.whichItem);

  }, //handleDelete
  render: function() {
    return(
      <li className="pet-item media">
        <div className="media-left">
          <button className="pet-delete btn btn-xs btn-danger" onClick={this.handleDelete}>
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        </div>
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
    ) // return
  } // render
}); //AptList

module.exports=AptList;