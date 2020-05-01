import React, { useEffect, useState } from "react";
import { VideoPlayer } from "component";
import { Button } from "reactstrap";
import "./style.scss";
import { Link } from "react-router-dom";
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
        <div className={`hero__offset ${play ? "d-none" : null}`}></div>
      </div>
      <div>
        <div className="container">
          <h1 className="mc-m-9 text-center mc-text-h2">Explore our courses</h1>
          <ol className="d-none d-md-block class-catalog__nav mc-text-small mc-mt-4 p-0 text-center">
            <li className="class-catalog__nav-item mc-mb-6">All</li>
            <li className="class-catalog__nav-item mc-mb-6 class-catalog__nav-item--active">
              Most Popular
            </li>
            <li className="class-catalog__nav-item mc-mb-6">
              Business, Politics
            </li>
            <li className="class-catalog__nav-item mc-mb-6">
              Music &amp; Entertainment
            </li>
            <li className="class-catalog__nav-item mc-mb-6">Writing</li>
            <li className="class-catalog__nav-item mc-mb-6">
              Design, Photography, &amp; Fashion
            </li>
            <li className="class-catalog__nav-item mc-mb-6">
              Information Technology
            </li>
          </ol>
          <div className="row sample-course">
            <div className="col-6 col-md-4">
              <Link to="/">
                <div className="mc-tile mc-tile--16x9">
                  <div className="mc-tile__content content">
                    <div className="mc-tile__component mc-tile-image">
                      <div className="mc-tile-image__image mc-background mc-background--loaded mc-background--fit-container mc-background--position-x-center mc-background--position-y-center mc-background--size-cover">
                        <div className="mc-background__background-container">
                          <img
                            src="https://www.masterclass.com/course-images/images/11317/original/1587431995-RF_primary_16x9.jpg?width=320&amp;dpr=2"
                            className="mc-background__background"
                            alt="name"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="mc-text-h6 mc-mt-2 mc-mb-1">Ron Finley</h6>
                <p className="mc-text-small mc-opacity--muted">
                  Teaches Gardening
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
