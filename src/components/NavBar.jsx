import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  const { user } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-green">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/SubcriptionArea">
                    Subscription
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    Welcome, {user.username}
                  </span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/QueryArea">
                    Query
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    // onClick={props.logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
