var React = require('react');

var AddAppointment = React.createClass({
  localToggleAptDisplay: function () {
    this.props.handleToggle(); //this is defined in the main component since state is controlled there
  }, //toggleAptDisplay

  localHandleAdd: function (e) {
    //note we will be acccessing the input fields via the ref attributes
    // eg ref="inputOwnerName"
    //note it receives an event handler  e   
    //(note all functions have e passed to it but we might not use it as in localToggleAptDisplay)
    var tempItem = {
      petName: this.refs.inputPetName.value,
      ownerName: this.refs.inputOwnerName.value,
      aptDate: this.refs.inputAptDate.value + ' ' + this.refs.inputAptTime.value,
      aptNotes: this.refs.inputAptNotes.value
    } //tempItem
    e.preventDefault();  //need to prevent the default behavior of the onSubmit button with this
            //normal behavior is to cause a reload and sending of the information to a server
    this.props.addApt(tempItem);  //pass tempItem to this prop in main
  }, //localHandleAdd

  render: function() {

    //this ia a style object we create (add any number of style parameters)
    //display with use a varialbe
    //block is visible and none is not visible
    //note displayAptBody is the style used on panel-body below
    var displayAptBody = {
      display: this.props.bodyVisible ? 'block' : 'none'
    }
    //NOTE: added displayAptBody style
    //NOTE: added onCLick in panel-heading
    //Note: add method to handle when user clicks to submit the form  onSubmit
    return(
      <div className="panel panel-primary">
        <div className="panel-heading apt-addheading" onClick={ this.localToggleAptDisplay } > 
        <span className="glyphicon glyphicon-plus"></span> Add Appointment</div>
        <div className="panel-body"  style={displayAptBody} >
          <form className="add-appointment form-horizontal"
          onSubmit={this.localHandleAdd}>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="petName">Pet Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petName" ref="inputPetName" placeholder="Pet's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="petOwner">Pet Owner</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                  id="petOwner" ref="inputOwnerName" placeholder="Owner's Name" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptDate">Date</label>
              <div className="col-sm-4">
                <input type="date" className="form-control"
                  id="aptDate" ref="inputAptDate" />
              </div>
              <label className="col-sm-2 control-label" for="aptTime">Time</label>
              <div className="col-sm-4">
                <input type="time" className="form-control"
                  id="aptTime" ref="inputAptTime" />
              </div>

            </div>
            <div className="form-group">
              <label className="col-sm-2 control-label" for="aptNotes">Apt. Notes</label>
              <div className="col-sm-10">
                <textarea className="form-control" rows="4" cols="50"
                  id="aptNotes" ref="inputAptNotes" placeholder="Appointment Notes"></textarea>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary pull-right">Add Appointment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )//return
  } //render
}); // AddAppointment

module.exports = AddAppointment;
