import React from "react";
import { VideoPlayer } from "component";
import "./style.scss";
const Home = () => {
  const hero = {
    autoplay: true,
    controls: false,
    sources: [
      {
        src: require("assets/video/hero.mp4"),
        type: "video/mp4",
      },
    ],
  };
  return (
    <div className="container">
      <div className="row">
        <div className="hero">
          <VideoPlayer {...hero} />
        </div>
      </div>
    </div>
  );
};
export default Home;
