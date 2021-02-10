import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience && experience.map((m) => (
    <tr key={m._id}>
      <td>{m.company}</td>
      <td className="hide-sm">{m.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{m.from}</Moment> -{" "}
        {m.to === null ? "Now" : <Moment format="YYYY/MM/DD">{m.to}</Moment>}
      </td>
      <td className="hide-sm">
        <button className="btn btn-danger" onClick={() => deleteExperience(m._id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h4 className="my-2">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr style={{ display: "table-row" }}>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
