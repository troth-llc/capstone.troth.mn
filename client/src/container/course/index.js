import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.scss";
const Course = () => {
  const [state, setState] = useState(null);
  const get = () => {
    axios.get("/api/course").then((res) => setState(res.data.result));
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <div className="course container">
      <h5 className="pt-5 pb-4">Our Courses</h5>
      <div className="row sample-course">
        {state ? (
          state.map((course) => {
            return (
              <div className="col-6 col-md-4" key={course._id}>
                <Link to={`/course/${course._id}/${course.episode[0]._id}`}>
                  <div className="mc-tile mc-tile--16x9">
                    <div className="mc-tile__content content">
                      <div className="mc-tile__component mc-tile-image">
                        <div className="mc-tile-image__image mc-background mc-background--loaded mc-background--fit-container mc-background--position-x-center mc-background--position-y-center mc-background--size-cover">
                          <div className="mc-background__background-container">
                            <img
                              src={course.cover}
                              className="mc-background__background"
                              alt="name"
                            />
                          </div>
                        </div>
                        <p className="episode-duration">
                          {course.episode.length} episode
                        </p>
                      </div>
                    </div>
                  </div>
                  <h6 className="mc-text-h6 mc-mt-2 mc-mb-1">{course.name}</h6>
                  <p className="mc-text-small mc-opacity--muted">
                    {course.category.name}
                  </p>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-center p-5 w-100">Loading...</p>
        )}
      </div>
    </div>
  );
};
export default Course;
