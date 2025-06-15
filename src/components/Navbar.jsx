import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link, NavLink } from 'react-router-dom';


const Navbar = ({taskCount}) => {
  const [showNav, setShowNav] = useState(true);

  return (
    <nav className={`nav ${showNav ? "" : "hide"}`}>
      <div className="nav-header">
        <h3 id="nav-header__text">Menu</h3>
        <img src="src/assets/menu.svg" alt="" id="menu-btn"  onClick={() => setShowNav(!showNav)}/>
      </div>
      <div className="nav-section">
        <p className="nav-section__headers">TASKS</p>
        <ul className="nav-section__list">
          <li>
            <NavLink to="/" className={`nav-links`} id="upcoming" >
              <img src="src/assets/upcoming.svg" alt="" className="list-icon" />
              <p>Upcoming</p>
              <span
                id="upcoming-number"
                className={`nav-number upcoming-number`}
              >{taskCount.upcoming}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/today' className={`nav-links`} id="today" >
              <img src="src/assets/today.svg" alt="" className="list-icon" />
              <p>Today</p>
              <span className={`nav-number today-number `}>{taskCount.today}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/all' className={`nav-links }`} id="all" >
              <img src="src/assets/all.svg" alt="" className="list-icon" />
              <p>All tasks</p>
              <span className={`nav-number all-number`}>{taskCount.all}</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="nav-section">
        <p className="nav-section__headers">LISTS</p>
        <ul className="nav-section__list">
          <li>
            <NavLink to='/personal' className={`nav-links `} id="personal" >
              <span
                className="list-icon"
                style={{ backgroundColor: "#FF6B6B" }}
              ></span>
              <p>Personal</p>
              <span
                id="personal-number"
                className={`nav-number personal-number `}
              >{taskCount.personal}</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/work' className={`nav-links `} id="work" >
              <span
                className="list-icon"
                style={{ backgroundColor: "#66D9E8" }}
              ></span>
              <p>Work</p>
              <span id="work-number" className={`nav-number work-number `}>{taskCount.work}</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
