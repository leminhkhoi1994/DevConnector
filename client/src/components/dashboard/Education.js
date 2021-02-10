import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  const edu = education && education.map((m) => (
    <tr key={m._id}>
      <td>{m.school}</td>
      <td className="hide-sm">{m.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{m.from}</Moment> -{" "}
        {m.to === null ? "Now" : <Moment format="YYYY/MM/DD">{m.to}</Moment>}
      </td>
      <td className="hide-sm">
        <button
          className="btn btn-danger"
          onClick={() => deleteEducation(m._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h4 className="my-2">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr style={{ display: "table-row" }}>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{edu}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
