import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Find = (props) => {
  const [state, setState] = useState(null);
  const [episode, setEpisode] = useState(null);
  const get = () => {
    axios
      .get(`/api/course/${props.match.params.id}/${props.match.params.episode}`)
      .then((res) => {
        setState(res.data.result);
        setEpisode(res.data.episode);
      });
  };
  const isYoutube = (url) => {
    if (url.length > 10) {
      url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : false;
    } else return false;
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
          <h5 className="pt-4 pb-3 mb-0 pl-3">{episode.name}</h5>
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
                        ></iframe>
                      </div>
                    ) : (
                      <div className="player-full">
                        <iframe
                          src={episode.video}
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
            <div className="col-12 col-lg-auto pl-0 ml-clear">
              <div className="pl-3 pr-3 col-12 d-block d-md-none description">
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${linkify(
                      episode.description.replace(/\n|\r\n|\r/g, "<br>")
                    )}`,
                  }}
                ></span>
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
          <div className="pl-3 pr-3 col-12 d-none d-lg-block description">
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
