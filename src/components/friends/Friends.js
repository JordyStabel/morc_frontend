import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getFriends } from "../../actions/friendActions";
import { getAuth } from "../../actions/authAction";
import Loading from "../layout/loading";

class Friends extends Component {
  componentDidMount() {
    // Call the mapped getFriends function which is the GET_FRIENDS from the reducer
    // Then automatically puts those friends into the props of this component
    this.props.getFriends();
    this.props.getAuth();
  }

  render() {
    const { friends } = this.props;

    // Check if there are any friends loaded, before loading the DOM
    if (this.props.auth.user !== null) {
      return (
        <Fragment>
          <div className="row">
            <div className="col-md-6">
              <h2>
                {" "}
                <i className="fas fa-users" /> Friends
              </h2>
            </div>
            <div className="col-md-6">
              <h5 className="text-right text-secondary">
                Account:{" "}
                <span className="text-primary">
                  {this.props.auth.user.username}
                </span>
              </h5>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Username</th>
                <th>Credits</th>
                <th>Online</th>
                <th>In-game</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {friends.map(friend => (
                <tr key={friend.id}>
                  <td>{friend.userName}</td>
                  <td>{friend.credits}</td>
                  <td>
                    {friend.online ? (
                      <i
                        className="fas fa-check-square"
                        style={{ color: "#20c997" }}
                      />
                    ) : null}
                  </td>
                  <td>
                    {Math.floor(Math.random() * 2) >= 1 && friend.online ? (
                      <i
                        className="fas fa-check-square"
                        style={{ color: "#20c997" }}
                      />
                    ) : null}
                  </td>
                  <td>
                    <Link
                      //to={`/friend/${friend.id}`}
                      to="/chat"
                      className="btn btn-secondary btn-sm"
                    >
                      <i className="fas fa-comments" /> Send Message
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      );
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading />
        </div>
      );
    }
  }
}

Friends.propTypes = {
  auth: PropTypes.object.isRequired,
  friends: PropTypes.array.isRequired,
  getFriends: PropTypes.func.isRequired,
  getAuth: PropTypes.func.isRequired
};

// Map the state from friend, which holds all friends,
// to the props of this friends component
const mapStateToProps = state => ({
  auth: state.auth,
  friends: state.friend.friends
});

export default connect(
  mapStateToProps,
  { getFriends, getAuth } // Pass along the imported 'getFriends' function from friendsActions
)(Friends);
