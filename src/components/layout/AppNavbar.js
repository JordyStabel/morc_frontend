import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/authAction";

const AppNavbar = ({ auth: { isAuthenticated }, logout }) => {
  const privateLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/lobby" className="nav-link">
          Lobby
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/social" className="nav-link">
          Social
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/game" className="nav-link">
          Game
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const publicLinks = (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Register
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          MORC
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMain"
        >
          <span className="navbar-toggler-icon" />{" "}
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          {<Fragment>{isAuthenticated ? privateLinks : publicLinks}</Fragment>}
        </div>
      </div>
    </nav>
  );

  //   render() {
  //     return (
  //       <nav className="navbar navbar-expand-md navbar-dark bg-primary">
  //         {/* mb-4 for margin under the navbar */}
  //         <div className="container">
  //           <Link to="/" className="navbar-brand">
  //             MORC
  //           </Link>
  //           <button
  //             className="navbar-toggler"
  //             type="button"
  //             data-toggle="collapse"
  //             data-target="#navbarMain"
  //           >
  //             <span className="navbar-toggler-icon" />{" "}
  //           </button>
  //           <div className="collapse navbar-collapse" id="navbarMain">
  //             <ul className="navbar-nav mr-auto">
  //               <li className="nav-item">
  //                 <Link to="/dashboard" className="nav-link">
  //                   Dashboard
  //                 </Link>
  //               </li>
  //               <li className="nav-item">
  //                 <Link to="/social" className="nav-link">
  //                   Social
  //                 </Link>
  //               </li>
  //               <li className="nav-item">
  //                 <Link to="/game" className="nav-link">
  //                   Game
  //                 </Link>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </nav>
  //     );
  //   }
  // }
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateProps,
  { logout }
)(AppNavbar);
