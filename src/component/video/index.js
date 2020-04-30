import React from "react";
import videojs from "video.js";
import "./style.scss";
export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs("hero-video-player", this.props);
  }
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }
  render() {
    return (
      <div data-vjs-player>
        <video id="hero-video-player"></video>
      </div>
    );
  }
}
