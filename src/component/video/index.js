import React from "react";
import videojs from "video.js";
import "./style.scss";
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log("onPlayerReady", this);
    });
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video ref={(node) => (this.videoNode = node)}></video>
        </div>
      </div>
    );
  }
}
