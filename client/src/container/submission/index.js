import React, { useContext } from "react";
import "./style.scss";
import { User } from "context/user";
import { Col } from "reactstrap";
import moment from "moment";
const Submission = () => {
  const { user } = useContext(User);
  return (
    <div className="container course">
      <h5 className="pt-4">Your Submissions</h5>
      <div className="submissions">
        {user ? (
          user.submissions.map((submission) => {
            return (
              <div className="submission-item" key={submission._id}>
                <div className="row">
                  <Col lg={2} xs={4} md={3}>
                    <div className="mc-tile mc-tile--16x9">
                      <div className="mc-tile__content content">
                        <div className="mc-tile__component mc-tile-image">
                          <div className="mc-tile-image__image mc-background mc-background--loaded mc-background--fit-container mc-background--position-x-center mc-background--position-y-center mc-background--size-cover">
                            <div className="mc-background__background-container">
                              <img
                                src={submission.episode.cover}
                                alt={submission.episode.name}
                                className="mc-background__background"
                              />
                            </div>
                          </div>
                          <p className="episode-duration">
                            {submission.episode.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-between">
                      <div className="submission-details fs-13">
                        <div className="fs-16">{submission.episode.name}</div>
                        <a
                          href={submission.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Submission file
                        </a>
                        <div className="submission-description fs-13 d-flex">
                          {submission.description.slice(0, 120)}
                          <div className="fs-13 text-muted ml-2">
                            {submission.status} •{" "}
                            {moment(submission.created).fromNow()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};
export default Submission;
