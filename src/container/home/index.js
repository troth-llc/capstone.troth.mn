import React, { useEffect, useState } from "react";
import { VideoPlayer } from "component";
import { Button } from "reactstrap";
import "./style.scss";
const Home = () => {
  const [scroll, setScroll] = useState({ opacity: 1, transform: 1 });
  const [play, setPlay] = useState(false);
  const hero = {
    autoplay: true,
    muted: true,
    controls: false,
    sources: [
      {
        src: require("assets/video/hero.mp4"),
        type: "video/mp4",
      },
    ],
  };
  useEffect(() => {
    window.onscroll = () => {
      var top = document.documentElement.scrollTop;
      setScroll({ opacity: 1 - top / 1000, transform: 1 - top / 8000 });
    };
  }, [scroll, hero]);
  return (
    <>
      <div
        id="hero"
        style={{
          opacity: scroll.opacity,
          transform: `scale(${scroll.transform})`,
        }}
        className={`${play ? "hp-pane" : null}`}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-10 col-md-9 col-xl-7">
              <div
                className={`hero__card hp-pane d-${
                  play ? "none" : "flex"
                } align-items-center`}
              >
                <div className="hero__card-content mc-p-9">
                  <button
                    className="material-icons btn btn-link close-hero"
                    onClick={() => {
                      document.getElementById(
                        "hero-video-player_html5_api"
                      ).muted = false;
                      setPlay(true);
                    }}
                  >
                    close
                  </button>
                  <h2 className="mc-text-h2">
                    Learn from the world’s best tech
                  </h2>
                  <div className="mc-mt-8 mc-mb-4">
                    <h4 className="mc-text-h4 mc-mb-1">
                      Unlimited access to all 10 instructors.
                    </h4>
                    <p className="mc-opacity--muted">
                      access to all courses for $200
                    </p>
                  </div>
                  <div className="hero-action pt-3">
                    <Button color="danger">Become a member</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero">
            <div className="bc-player">
              <div className="bc-player__wrapper">
                <VideoPlayer {...hero} />
              </div>
            </div>
          </div>
        </div>
        <div className="hero__offset"></div>
      </div>

      <div>
        <div className="container">
          <h1>Hello world!</h1>
        </div>
      </div>
    </>
  );
};
export default Home;
