import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Collapse,
  Modal,
  FormGroup,
  Label,
  Input,
  Button,
  ModalHeader,
  FormFeedback,
} from "reactstrap";
import { User } from "context/user";
const Find = (props) => {
  const { user } = useContext(User);
  const [state, setState] = useState(null);
  const [episode, setEpisode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [submission, setSubmission] = useState({});
  const submissionFile = useRef(null);
  const [disabled, disable] = useState(false);
  const [error, setError] = useState({});
  const toggle = () => setIsOpen(!isOpen);
  const toggle_modal = () => setModal(!modal);
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
                    {user ? (
                      episode.msg ? (
                        <div className="premium-video">
                          <a
                            className="btn btn-danger member-button"
                            href="https://troth.mn/capstone/premium"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Become a member
                          </a>
                        </div>
                      ) : isYoutube(episode.video) ? (
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
                      )
                    ) : (
                      <div className="premium-video flex-column">
                        <h6 className="text-center mb-0">
                          Та нэвтэрч орсны дараа үзэх боломжтой.
                        </h6>
                        <br />
                        <a
                          className="btn btn-danger member-button"
                          href={`https://troth.mn/auth?next=${encodeURI(
                            "https://capstone.troth.mn"
                          )}`}
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
            <div className="col-12 col-lg-auto pl-0 ml-clear episode-list">
              <div className="col-12 d-block d-lg-none p-0 pb-3">
                {episode.msg ? null : (
                  <>
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
                    {episode.free === false ? (
                      <div
                        className="description mt-2"
                        onClick={() => {
                          var current = user.submissions.find(
                            (submission) =>
                              submission.episode._id ===
                              props.match.params.episode
                          );
                          if (!current) setModal(true);
                        }}
                      >
                        <span className="d-flex ml-2">
                          <span className="material-icons mr-2">
                            assignment
                          </span>
                          Submission
                        </span>
                      </div>
                    ) : null}
                  </>
                )}
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
            {episode.msg && user ? null : (
              <>
                <div className="d-flex pb-2 justify-content-between">
                  <h6 className="mb-0">{episode.name}</h6>
                  {episode.free === false ? (
                    <div
                      className="submission"
                      onClick={() => {
                        var current = user.submissions.find(
                          (submission) =>
                            submission.episode._id ===
                            props.match.params.episode
                        );
                        if (!current) setModal(true);
                      }}
                    >
                      <span className="d-flex">
                        <span className="material-icons mr-2">assignment</span>
                        Submission
                      </span>
                    </div>
                  ) : null}
                </div>
                {episode.description ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${linkify(
                        episode.description.replace(/\n|\r\n|\r/g, "<br>")
                      )}`,
                    }}
                  ></span>
                ) : null}
              </>
            )}
          </div>
        </>
      ) : (
        <p className="text-center p-5 w-100">Loading.</p>
      )}
      <Modal isOpen={modal} centered className="submission-modal">
        <ModalHeader toggle={toggle_modal} disabled={disabled}></ModalHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const { current } = submissionFile;
            var FileSize = current.files[0].size / 1024 / 1024;
            if (FileSize > 25) {
              setError({ file: "Submission file must be under 25mb" });
            } else {
              disable(true);
              const upload = new FormData();
              upload.append("file", current.files[0]);
              upload.append(
                "description",
                submission.description ? submission.description : ""
              );
              upload.append("episode_id", props.match.params.episode);
              axios({
                method: "post",
                url: `/api/submission/${submission._id ? "update" : "create"}`,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
                data: upload,
              }).then((response) => {
                if (response.data.status) window.location.reload();
                else {
                  let errors = response.data.errors;
                  errors.map((error) => setError({ [error.param]: error.msg }));
                  disable(false);
                }
                disable(false);
              });
            }
          }}
        >
          <FormGroup>
            <Label>Submission file</Label>
            <input
              type="file"
              name="file"
              ref={submissionFile}
              required={true}
              className={`form-control-file ${error.file ? "is-invalid" : ""}`}
            />
            <FormFeedback>{error.file}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>Description</Label>
            <Input
              type="textarea"
              onChange={(e) =>
                setSubmission({ ...submission, description: e.target.value })
              }
            />
          </FormGroup>
          <Button color="danger" type="submit" disabled={disabled} block>
            Send
          </Button>
        </form>
      </Modal>
    </div>
  );
};
export default Find;
