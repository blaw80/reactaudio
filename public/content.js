import React from 'react';
import $ from "./scripts/jquery-2.1.4.js";

var data = [
  {songtitle: "stir it up", artist: "b marley", id:0, url:"#"},
  {songtitle: "bach to school", artist: "we're in towne", id:1, url:"#"}
];

class AudioControls extends React.Component {
    render() {
      return <div className="audioControls">
            <button id="rewindbtn">rewind</button>
            <button id="playbtn">play</button>
            <button id="ffbtn">ff</button>
          </div>
    }
  };

class PlaylistItem extends React.Component{
    render(){
      return <li rel={this.props.url}>
          {this.props.songtitle +', '+ this.props.artist}
        </li>
    }
};

class ActivePlaylist extends React.Component{
  render(){
    var playlistNodes = this.props.data.map( (track) => {
      return <PlaylistItem key={track.id} songtitle={track.songtitle} artist={track.artist} url={track.url}/>;
    });
    return <ul>
        {playlistNodes}
      </ul>
  }
};

class AudioPlayer extends React.Component{
  constructor(props) {
  super(props);
  this.state = {data: this.props.data};
  }
  trackAdded(){
    this.setState({data: data})
  }
  render(){
    return <div className='columns five'>
            <audio controls type="audio/mpeg">
              <source type="audio/mp3" src="https://archive.org/download/BlindLemonJeffersonMp3AudioSongs/blindlemonjefferson-EasyRiderBlues.mp3" />
            </audio>
            <AudioControls />
            <ActivePlaylist data={this.state.data} />
            </div>
    }
  };

class SongItem extends React.Component{

  addTrack(){
    alert(typeof this);
    /*
    data.push({songtitle: this.props.songtitle,
                artist: this.props.artist,
                url: this.props.url,
                id: this.props._id
              });
    AudioPlayer.trackAdded();
    */
  }

  render(){
    return <tr>
              <td>{this.props.songtitle}</td>
              <td>{this.props.artist}</td>
            <td>
              <span className="infobutton fa fa-info-circle" rel={this.props._id}>
              </span>
            </td>
            <td>
              <span className="addtoplaylist fa fa-plus-circle" onClick = {this.addTrack}
                rel = {this.props.url}>
              </span>
            </td>
          </tr>
  }
};

class SongLibrary extends React.Component{

  render(){

    var songNodes = this.props.data.map(function (track) {
      return (
        <SongItem _id={track._id} key={track._id} songtitle={track.songtitle} artist={track.artist} url={track.url}/>
      );
    });

    return(
      <div id='songLibrary'>
        <table>
          <thead>
            <tr>
              <th>song</th>
              <th>artist</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songNodes}
          </tbody>
        </table>
      </div>
    );
  }
};

class ContentBox extends React.Component{

  constructor(props) {
  super(props);
  this.state = {data: []};
  }

  loadTracksFromServer(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadTracksFromServer();
  }

  render(){
    return(
        <div className='columns seven'>
          <h3>browse tracks here</h3>
          <SongLibrary data={this.state.data} />
        </div>
    );
  }
};

class PageHeader extends React.Component{
  render(){
    return <div className='row header'>
            <div className='columns twelve'>
              <h1>welcome to music box</h1>
            </div>
          </div>
  }
};

export default React.render(
  <div>
    <PageHeader />
    <div className='row'>
      <ContentBox url='http://mixtape.press/play/tracklist' />
      <AudioPlayer data={data}/>
    </div>
  </div>,
  document.getElementById('content')
);
