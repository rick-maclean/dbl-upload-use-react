var React = require('react');

var SearchAppointments = React.createClass({
  // NOTE adding the following pattern:
  //   { (this.props.subSortDirection === 'asc') ? <span className="glyphicon glyphicon-ok"></span>: null }
  // checks the value of this.props.subSortDirection which we get from  the mainComponent state.sortDirection
  // and shows or hides a checkbox  <span className="glyphicon glyphicon-ok"></span>:
  //
  // Now we need to add event handler functions for sortBy and sortDirection

  //passs on the information to an event handler in the mainComponent via a prop
  handleSortBy: function(e){
    this.props.onReOrder(e.target.id, this.props.subSortDirection); //Note id cam be perName, aptDate, ownerName
                                                                    //also note we are not changing the value of subSortDirection
  }, //handleSortBy

  handleSortDirection: function(e) {
    this.props.onReOrder(this.props.subSortBy, e.target.id); //Note id can be asc or desc
  }, //handleSortDirection

  handleSearch: function(e) {
    this.props.onSearch(e.target.value);
  }, //handleSearch

  render: function() {
    return(
      <div className="row search-appointments">
        <div className="col-sm-offset-3 col-sm-6">
          <div className="input-group">
            <input id="SearchApts" onChange= { this.handleSearch } placeholder="Search" type="text" className="form-control" aria-label="Search Appointments" />
            <div className="input-group-btn">
              <button type="button" className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by: <span className="caret"></span></button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a href="#" id="petName" onClick={this.handleSortBy} >Pet Name  { (this.props.subSortBy === 'petName') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                  <li><a href="#" id="aptDate" onClick={this.handleSortBy} >Date  { (this.props.subSortBy === 'aptDate') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                  <li><a href="#" id="ownerName" onClick={this.handleSortBy} >Owner   { (this.props.subSortBy === 'ownerName') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#" id="asc" onClick={this.handleSortDirection} >Asc  { (this.props.subSortDirection === 'asc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                  <li><a href="#" id="desc" onClick={this.handleSortDirection} >Desc  { (this.props.subSortDirection === 'desc') ? <span className="glyphicon glyphicon-ok"></span>: null }</a></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
    ) // return
  } // render
}); //SearchAppointments

module.exports = SearchAppointments;
