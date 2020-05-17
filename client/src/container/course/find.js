import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";
const Find = (props) => {
  const [state, setState] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const get = () => {
    axios
      .get(`/api/course/${props.match.params.id}/${props.match.params.episode}`)
      .then((res) => {
        setState(res.data.result);
        setEpisode(res.data.episode);
      });
  };
  const isYoutube = (url) => {
    var match = url.match(
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/
    );
    return match && match[2].length == 11 ? match[2] : false;
  };
  const linkify = (text) => {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
    return text.replace(exp, "<a href='$1'>$1</a>");
  };
  useEffect(() => {
    get();
  }, [props.match.params.episode]);
  return (
    <div className="course container">
      {state && episode ? (
        <>
          <h5 className="pt-4 pb-3 mb-0 pl-3">{state.name}</h5>
          <div className="row">
            <div className="col">
              <div className="p-3">
                <div className="bc-player">
                  <div className="bc-player__wrapper">
                    {isYoutube(episode.video) ? (
                      <div className="player-full">
                        <iframe
                          src={episode.video}
                          frameBorder="0"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title="youtube player"
                        ></iframe>
                      </div>
                    ) : (
                      <div className="player-full">
                        <iframe
                          src={episode.video}
                          title="vimeo"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-auto pl-0 ml-clear episode-list">
              <div className="col-12 d-block d-lg-none p-0 pb-3">
                <h6 className="pl-3 pr-3 pb-2">{episode.name}</h6>
                <div className="description" onClick={toggle}>
                  <span>Description</span>
                  <span className="material-icons">
                    {isOpen ? "arrow_drop_up" : "arrow_drop_down"}
                  </span>
                </div>
                <Collapse
                  isOpen={isOpen}
                  className="pr-3 pl-3 fs-13 pt-2"
                  dangerouslySetInnerHTML={{
                    __html: `${linkify(
                      episode.description.replace(/\n|\r\n|\r/g, "<br>")
                    )}`,
                  }}
                />
              </div>
              {state.episode.map((episode, index) => {
                return (
                  <Link
                    to={`/course/${props.match.params.id}/${episode._id}`}
                    className={`category-trigger${
                      episode._id === props.match.params.episode
                        ? " active"
                        : ""
                    }`}
                    key={episode._id}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 mr-5">
                        <span className="material-icons">
                          {episode._id === props.match.params.episode
                            ? "pause"
                            : "play_arrow"}
                        </span>
                        {index + 1 + ". " + episode.name}
                      </h6>
                      <p className="mc-opacity--muted mc-text-small mb-0">
                        {episode.duration}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="pl-3 pr-3 col-12 d-none d-lg-block fs-13">
            <h6 className="pb-2">{episode.name}</h6>
            <span
              dangerouslySetInnerHTML={{
                __html: `${linkify(
                  episode.description.replace(/\n|\r\n|\r/g, "<br>")
                )}`,
              }}
            ></span>
          </div>
        </>
      ) : (
        <p className="text-center p-5 w-100">Loading.</p>
      )}
    </div>
  );
};
export default Find;
