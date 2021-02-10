import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    debugger;
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null && loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to profiles
          </Link>
          
          {/* TODO */}
          {/* {auth.isAuthenticated &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit profile
              </Link>
            )} */}

          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div class="profile-exp bg-white p-2">
              <h4 className="text-primary">Experience</h4>
              {
                profile.experience.length > 0 ? (<Fragment>
                  {profile.experience.map((exp) => {
                    <ProfileExperience key={exp._id} experience={exp} />
                  })}
                </Fragment>) : (<h4>No experience credentials</h4>)
              }
            </div>

            <div class="profile-edu bg-white p-2">
              <h4 className="text-primary">Education</h4>
              {
                profile.education.length > 0 ? (<Fragment>
                  {profile.education.map((edu) => {
                    <ProfileEducation key={edu._id} education={edu} />
                  })}
                </Fragment>) : (<h4>No education credentials</h4>)
              }
            </div>

            {
              profile.githubusername && <ProfileGithub />
            }
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
