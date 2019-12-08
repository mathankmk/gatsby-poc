import { Link } from "gatsby"
import React from "react"

import "./header.css"

const Header = ({ siteTitle }) => (
  <header className="header">
    <div className="headsection">
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/blog">Blog</Link>
        </li>
        <li>
          <Link to="/list">List</Link>
        </li>
      </ul>
    </div>
  </header>
)

export default Header
