import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/authAction";
import { notifyUser } from "../../actions/notifyActions";

class PasswordForget extends Component {
  state = {
    uName: "",
    email: "",
    password: "",
    repeat: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      console.log(nextProps.auth);
      this.props.history.push("/dashboard");
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { register, auth, notifyUser } = this.props;
    const { uName, password, repeat, email } = this.state;

    if (password !== repeat) {
      notifyUser("Passwords do not match", "danger");
    } else {
      register({
        uName,
        email,
        password
      });
    }

    console.log(auth);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <div className="card">
            <div className="card-body">
              <h1 className="text-center pb-4 pt-3">
                <span className="text-primary">
                  <i className="fas fa-lock" /> Password Forget
                </span>
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="uName"
                    required
                    value={this.state.uName}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Request password reset"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PasswordForget.propTypes = {
  notifyUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { notifyUser, register }
)(PasswordForget);
