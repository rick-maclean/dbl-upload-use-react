var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

//var Line = require('rc-progress').Line;
//var Circle = require('rc-progress').Circle;

var LoginSubcomponent = require('./LoginSubcomponent');
var JobSpecification = require('./JobSpecification');
var ProgressElement = require('./ProgressBar');
//var ReactPercentageCircle = require('./ReactPercentageCircle');

function persistData(storage_key, jsonData) {
  console.log('inside persitComponent() and storage_key is ' + storage_key + ', and jsonData is, ' + jsonData);
    const appStorage = require('electron-json-storage');
    //Write
    appStorage.set(storage_key, jsonData, function (error) {
        if (error) throw error;
    });
}

function isNonemptyString(str) {
  if (typeof str === 'string' && str.length > 0) {
      return true;
  }
  else {
    return false;
  }
}

//var classSet        = require('./utils/classSet');
//var ProgressElement = require('./components/Progress');
//var JobSpecification = require('./Rc-progress');
//var ProgressBar = require('./ProgressBar');

var jsonData =   '{   "loginPersistKey": "Buffy@dogsplace.uk" , "metaDataPersistKey" : "c-path-pathtofilesFOLDER", "jobFilePersistKey" : "c-path-jobfilename"}';
var jsonToObjData = JSON.parse(jsonData);

var MainInterface = React.createClass({
  getInitialState: function() {
    return {
      emailUsername: '',
        password: '',
        metaDataFolder: 'metaDataFolder',
        metaDataFolderSelected: false,
        jobFilepath: 'jobFilepath',
        jobFilepathSelected: false,
        currentByteCount: 0,
        totalByteCount: 0,
        userKey: '',
        errorMessage: '',
        electronJsonStoredValue: '',
        persistedData: jsonToObjData,
        percentComplete: 15
    } //return
  }, //getInitialState

  componentDidMount: function() {
    console.log('componentDidMount lifecycle running');

    var data = this.state.persistedData;

      console.log('inside onestorePersistedAllData');
      console.log('data.loginPersistKey is =>' +data.loginPersistKey);
      console.log('data.metaDataPersistKey is =>' +data.metaDataPersistKey);
      console.log('data.jobFilePersistKey is =>' +data.jobFilePersistKey);
      // console.log('ALL the data restored from electron-json-storage  is : ' + data);
      jQuery('#inputEmail').val(data.loginPersistKey);

      if (isNonemptyString(data.metaDataPersistKey) ) {
        jQuery('#metaDataFolderId').text(data.metaDataPersistKey);
        this.setState( { metaDataFolderSelected : true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey) ) {
        jQuery('#jobFilePathId').text(data.jobFilePersistKey);
        this.setState( { jobFilepathSelected : true }); //setState
      }

      if (isNonemptyString(data.jobFilePersistKey) && isNonemptyString(data.metaDataPersistKey)) {
        $('#sendButton').removeAttr("disabled");
      }

  }, //componentDidMount

  componentWillUnmount: function() {
    this.serverRequest.abort();
  }, //componentWillUnmount

  componentDidUpdate: function() {
    console.log('componentDidUpdate lifecycle running');
    console.log('this.state.metaDataFolder is =>' + this.state.metaDataFolder);
    console.log('this.state.metaDataFolderSelected is =>' + this.state.metaDataFolderSelected);
    console.log('this.state.jobFilepath is =>' + this.state.jobFilepath);
    console.log('this.state.jobFilepathSelected is =>' + this.state.jobFilepathSelected);
}, //componentDidUpdate

  mainHandleLogin: function(loginCredentials) {
    var subuserName = loginCredentials.userName;
    var subpassword = loginCredentials.password;
    console.log('subuserName is = ' + subuserName);
    console.log('subpassword is = '  + subpassword);
    /*this.setState( {
      emailUsername : subuserName,
      password: subpassword
    }); //setState */
    this.setState( {
      emailUsername : subuserName,
      password : subpassword
      }); //setState
    //persistComponent('loginPersistKey', subuserName);
  }, //mainHandleLogin

  onSelectMetaDataFile: function () {
    console.log('called onSelectMetaDataFile');
          this.setState({ metaDataFolderSelected: true });
          this.setState({  metaDataFolder: 'c-path-pathtofilesFOLDER' });
      console.log('end of onSelectMetaDataFile');
  },

  onSelectJobSpecsFile: function () {
    console.log('called onSelectJobSpecsFile');
        this.setState({ jobFilepathSelected: true });
        this.setState({ jobFilepath: 'c-path-jobfilename' });
      console.log('end of onSelectJobSpecsFile');
  },

    onHandleSend: function(sendFileSpecs) {
      console.log('called onHandleSend');
      console.log('metaDataFolder= ' + sendFileSpecs.metaDataFolder);
      console.log('jobFilepath= ' + sendFileSpecs.jobFilepath);
      var temp_percentComplete = this.state.percentComplete;
      if (temp_percentComplete == 100)
        { temp_percentComplete = 20; }
      temp_percentComplete = temp_percentComplete + 0.33*temp_percentComplete;
      if (temp_percentComplete > 100) {
          this.setState({ percentComplete: 100}); }
        else {
          this.setState({ percentComplete: temp_percentComplete});
        }
  }, //onHandleSend

  render: function() {

    $('#sendButton').removeAttr("disabled");


    return (
      <div className="interface">
        <LoginSubcomponent
        subHandleLogin = {this.mainHandleLogin}
        subUsername = {this.state.emailUsername}
        subPassword = {this.state.password}
        />
        <JobSpecification
            metadataFilepath = {this.state.metadataFilepath}
            jobFilepath = {this.state.jobFilepath}
            onselectMetaDataFile = {this.onSelectMetaDataFile}
            onselectJobSpecsFile = {this.onSelectJobSpecsFile}
            handleSend = {this.onHandleSend}
        />
        <ProgressElement
              percentComplete={this.state.percentComplete} />
      </div>

    ) //return
  } //render
}); //MainInterface

ReactDOM.render(
  <MainInterface />,
  document.getElementById('ubsUploads')
); //render
