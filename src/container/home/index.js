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
  const [categories, activecategory] = useState([
    { name: "All", type: "all", active: false },
    { name: "Most Popular", type: "popular", active: true },
    { name: "Business Politics", type: "business", active: false },
    { name: "Music & Entertainment", type: "music", active: false },
    { name: "Writing", type: "writing", active: false },
    { name: "Design, Photography, & Fashion", type: "desing", active: false },
    { name: "Information Technology", type: "it", active: false },
  ]);
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
            {categories.map((category, index) => {
              return (
                <li
                  className={`class-catalog__nav-item mc-mb-6 ${
                    category.active ? "class-catalog__nav-item--active" : null
                  }`}
                  key={index}
                  onClick={() => {
                    var selected = categories.map((c) => {
                      c.active = false;
                      return c;
                    });
                    selected[index].active = true;
                    activecategory([...selected]);
                  }}
                >
                  {category.name}
                </li>
              );
            })}
          </ol>
          <div className="d-md-none">
            <select
              id="cat-select"
              className="c-button c-button--full-width c-button--secondary c-button--medium mc-mt-1 mc-mb-6 justify-content-between w-100"
              defaultValue={categories.find((c) => c.active).type}
              onChange={(e) => {
                console.log("fetch data by this filter " + e.target.value);
              }}
            >
              {categories.map((category, index) => {
                return (
                  <option value={category.type} key={index}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
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
