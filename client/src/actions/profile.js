import axios from "axios";
import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED, GET_PROFILES, GET_REPOS } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};


export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });

  try {
    const res = await axios.get("/api/profile/all");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};


export const getProfileById = (userId) => async (dispatch) => {  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};


export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create or Update Profile
export const createProfile = (formData, history, isEdit = false) => async (
  dispatch
) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });

    dispatch(
      setAlert(isEdit ? "Profile Updated" : "Profile Created", "success")
    );

    if (!isEdit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const error = err.response.data;
    if (error) {
      Object.keys(error).forEach((e) => dispatch(setAlert(error[e], "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data;
    if (error) {
      Object.keys(error).forEach((e) => dispatch(setAlert(error[e], "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const error = err.response.data;
    if (error) {
      Object.keys(error).forEach((e) => dispatch(setAlert(error[e], "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


export const deleteAccount = () => async dispatch => {
  if(window.confirm("Are you sure ? This can NOT be Undone!!!")) {
    try {
        const res = await axios.delete("/api/profile");
        dispatch({
          type: CLEAR_PROFILE,
        });

        dispatch({
          type: ACCOUNT_DELETED,
        });

        dispatch(setAlert("Your account has been permanantly deleted"));
    
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
}
