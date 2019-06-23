import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLobby } from "../../actions/lobbyAction";

class AddLobby extends Component {
  state = {
    gameName: "",
    maxCount: 4
  };

  onSubmit = event => {
    event.preventDefault();
    const { addLobby, history } = this.props;

    addLobby({
      token: this.props.token,
      newLobbyName: this.state.gameName.replace(/ /g, "_")
    });

    console.log(this.props.token);

    this.setState({
      gameName: "",
      maxCount: 4
    });

    history.push("/lobby");
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <Link to="/lobby" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back To Lobby
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add New Lobby</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">Game Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="gameName"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.gameName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="player-count">Max Amount of Players</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxCount"
                  onChange={this.onChange}
                  value={this.state.maxCount}
                />
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block "
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddLobby.propTypes = {
  lobbies: PropTypes.object.isRequired,
  token: PropTypes.object.isRequired,
  addLobby: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  lobbies: state.lobby.lobbies,
  token: state.auth.token
});

export default connect(
  mapStateToProps,
  { addLobby }
)(AddLobby);
