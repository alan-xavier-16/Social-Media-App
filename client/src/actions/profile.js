import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE
} from "./types";

/* ACTION FOR GET CURRENT USER PROFILE */
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION FOR CREATE / UPDATE USER PROFILE */
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    /* If Editing a Profile, no redirect. If creating a Profile, redirect */
    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    /* Catches all errors and displays them, such as missing form fields */
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION FOR ADD EXPERIENCE */
export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience Added", "success"));
    /* Redirect to Dashboard */
    history.push("/dashboard");
  } catch (err) {
    /* Catches all errors and displays them, such as missing form fields */
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION FOR ADD EDUCATION */
export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Added", "success"));
    /* Redirect to Dashboard */
    history.push("/dashboard");
  } catch (err) {
    /* Catches all errors and displays them, such as missing form fields */
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION TO DELETE EXPERIENCE */
export const deleteExperience = exp_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${exp_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION TO DELETE EDUCATION */
export const deleteEducation = edu_id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${edu_id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      } /* Gets error message text and status */
    });
  }
};

/* ACTION TO DELETE ACCOUNT AND CLEAR PROFILE */
export const deleteAccount = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone.")) {
    try {
      const res = await axios.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Account Deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status
        } /* Gets error message text and status */
      });
    }
  }
};
