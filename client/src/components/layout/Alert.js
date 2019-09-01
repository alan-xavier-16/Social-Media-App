import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/*
- Checks that alert array isn't empty or null,
- Returns an array with the alert message
*/
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

/* MAPS THE STATE FROM reducer/index.js TO PROPS */
const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
