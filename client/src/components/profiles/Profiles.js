import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
    useEffect(() => {debugger
        getProfiles();
    },[])
  return <Fragment>
      {loading ? <Spinner /> : 
      <Fragment> 
            <h1 className="text-primary">Developers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Browser and connect with developers
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (profiles.map(profile => (
                    <ProfileItem key={profile._id} profile={profile} />
                ))) : <h4>No Profiles Found ...</h4>}
            </div>
          </Fragment>}
  </Fragment>;
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
};

const mapstateToProps = (state) => (
  {
    profile: state.profile
  }
);

export default connect(mapstateToProps, { getProfiles })(Profiles);
