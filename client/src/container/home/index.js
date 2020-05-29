import React, { useEffect, useState, useContext } from "react";
import { VideoPlayer } from "component";
import { Button } from "reactstrap";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "context/user";
const Home = () => {
  const { user } = useContext(User);
  const [scroll, setScroll] = useState({ opacity: 1, transform: 1 });
  const [play, setPlay] = useState(false);
  const isYoutube = (url) => {
    var match = url.match(
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    );
    return match && match[2].length == 11 ? match[2] : false;
  };
  const hero = {
    autoplay: true,
    muted: true,
    controls: false,
    sources: [
      {
        src: "https://cdn.troth.mn/media/hero.mp4",
        type: "video/mp4",
      },
    ],
  };
  const [course, setCourse] = useState(null);
  const [intro, setIntro] = useState(null);
  const get = () => {
    axios.get("/api/course").then((res) => {
      var set = res.data.result.map((result, index) => {
        return { ...result, active: index === 0 ? true : false };
      });
      setCourse(set);
    });
    axios.get("/api/course/intro").then((res) => {
      var set = res.data.result.map((result, index) => {
        return {
          name: result.name,
          duration: result.episode.length
            ? result.episode[0].duration
            : "00:00",
          video: result.episode.length ? result.episode[0].video : false,
          active: index === 0 ? true : false,
        };
      });
      setIntro(set);
    });
  };
  useEffect(() => {
    get();
  }, []);
  useEffect(() => {
    window.onscroll = () => {
      var top = document.documentElement.scrollTop;
      setScroll({ opacity: 1 - top / 1000, transform: 1 - top / 8000 });
    };
  }, [scroll, hero]);
  useEffect(() => {}, [course, intro]);
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
                        "hero-player_html5_api"
                      ).muted = false;
                      setPlay(true);
                    }}
                  >
                    close
                  </button>
                  <h2 className="mc-text-h2">Learn from the world’s best *</h2>
                  <div className="mc-mt-8 mc-mb-4">
                    <h4 className="mc-text-h4 mc-mb-1">
                      Unlimited access to all ∞ instructors.
                    </h4>
                    <p className="mc-opacity--muted">
                      access to all courses for $$$
                    </p>
                  </div>
                  <div className="hero-action pt-3">
                    <a
                      color="danger"
                      className="member-button btn-danger btn-link btn"
                      href="https://troth.mn/capstone/premium"
                      target="_blank"
                      rel="noopener"
                    >
                      Become a member
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hero">
            <div className="bc-player">
              <div className="bc-player__wrapper">
                <VideoPlayer {...hero} id="hero-player" />
              </div>
            </div>
          </div>
        </div>
        <div className={`hero__offset ${play ? "d-none" : null}`}></div>
      </div>
      <div>
        <div className="container">
          <h1 className="mc-m-9 text-center mc-text-h2">Бидний сургалтууд</h1>
          {course && course.length > 0 ? (
            <>
              <ol className="d-none d-md-block class-catalog__nav mc-text-small mc-mt-4 p-0 text-center">
                {course.map((c, index) => {
                  return (
                    <li
                      className={`class-catalog__nav-item mc-mb-6 ${
                        c.active ? "class-catalog__nav-item--active" : null
                      }`}
                      key={c._id}
                      onClick={() => {
                        var selected = course.map((c) => {
                          c.active = false;
                          return c;
                        });
                        selected[index].active = true;
                        setCourse([...selected]);
                      }}
                    >
                      {c.name}
                    </li>
                  );
                })}
              </ol>
              <div className="d-md-none">
                <select
                  id="cat-select"
                  className="c-button c-button--full-width c-button--secondary c-button--medium mc-mt-1 mc-mb-6 justify-content-between w-100"
                  value={course.find((c) => c.active)._id}
                  onChange={(e) => {
                    var selected = course.map((c) => {
                      c.active = false;
                      return c;
                    });
                    course.find((c) => c._id === e.target.value).active = true;
                    setCourse([...selected]);
                  }}
                >
                  {course.map((c) => {
                    return (
                      <option value={c._id} key={c._id}>
                        {c.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="row sample-course">
                {course
                  .find((c) => c.active)
                  .episode.map((episode) => {
                    return (
                      <div className="col-6 col-md-4" key={episode._id}>
                        <Link
                          to={`/course/${course.find((c) => c.active)._id}/${
                            episode._id
                          }`}
                        >
                          <div className="mc-tile mc-tile--16x9">
                            <div className="mc-tile__content content">
                              <div className="mc-tile__component mc-tile-image">
                                <div className="mc-tile-image__image mc-background mc-background--loaded mc-background--fit-container mc-background--position-x-center mc-background--position-y-center mc-background--size-cover">
                                  <div className="mc-background__background-container">
                                    <img
                                      src={episode.cover}
                                      className="mc-background__background"
                                      alt="name"
                                    />
                                  </div>
                                </div>
                                <p className="episode-duration">
                                  {episode.duration}
                                </p>
                              </div>
                            </div>
                          </div>
                          <h6 className="mc-text-h6 mc-mt-2 mc-mb-1">
                            {episode.name}
                          </h6>
                          <p className="mc-text-small mc-opacity--muted">
                            {episode.description}
                          </p>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <p className="text-center">Loading...</p>
          )}
        </div>
        <div className="container mb-5">
          <div className="text-center">
            <h1 className="mc-m-9 mc-text-h2 mb-0">Сургалтын танилцуулга</h1>
            <p className="mc-opacity--muted mb-4">
              {/* (Тухайн хичээлийн ерөнхий агуулга тайлбар бичлэг) */}
            </p>
          </div>
          <div className="category-showcase-container">
            <div className="row">
              <div className="col">
                <div className="p-3">
                  <div className="bc-player">
                    <div className="bc-player__wrapper">
                      {user ? (
                        intro && intro.length > 0 ? (
                          isYoutube(intro.find((i) => i.active).video) ? (
                            <div className="player-full">
                              <iframe
                                src={intro.find((i) => i.active).video}
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="youtube player"
                              ></iframe>
                            </div>
                          ) : (
                            <div className="player-full">
                              <iframe
                                src={intro.find((i) => i.active).video}
                                title="vimeo"
                                frameBorder="0"
                                allow="autoplay; fullscreen"
                                allowFullScreen
                              ></iframe>
                            </div>
                          )
                        ) : null
                      ) : (
                        <div className="premium-video flex-column">
                          <h6 className="text-center mb-0">
                            Та нэвтэрч орсны дараа үзэх боломжтой.
                          </h6>
                          <br />
                          <a
                            className="btn btn-danger member-button"
                            href="https://troth.mn/auth"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Нэвтрэх
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-auto pl-0 ml-clear">
                {intro
                  ? intro.map((int, index) => {
                      return (
                        <div
                          className={`category-trigger${
                            int.active ? " active" : ""
                          }`}
                          key={index}
                          onClick={() => {
                            var selected = intro.map((c) => {
                              c.active = false;
                              return c;
                            });
                            selected[index].active = true;
                            setIntro([...selected]);
                          }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <h6 className="mb-0 mr-5">
                              <span className="material-icons">
                                {int.active ? "pause" : "play_arrow"}
                              </span>
                              {int.name}
                            </h6>
                            <p className="mc-opacity--muted mc-text-small mb-0">
                              {int.duration}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
