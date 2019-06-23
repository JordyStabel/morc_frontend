import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Create an alert pop-up object
// Can consume props form the notifyUser action
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id}>
      <div
        className={`alert alert-${
          alert.messageType
        } alert-dismissible fade show`}
        role="alert"
        style={{ width: "50%", margin: "auto", marginTop: "20px" }}
      >
        <h4 className="alert-heading">{alert.reason}</h4>
        {alert.message}
        <hr />
        <p class="mb-0">
          This alert will automatically go away after{" "}
          <strong>{alert.timeout / 1000} seconds</strong>
        </p>
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.notify
});

export default connect(mapStateToProps)(Alert);
