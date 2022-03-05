import * as React from "react"
// import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

const Sidebar = () => {
  return (

    <div class="col-md-4">
      <div class="position-sticky" style={{top: '2rem'}}>
        
        <div class="p-4 mb-3 bg-light rounded">
          <h4 class="fst-italic">About</h4>
          <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers, content, or something else entirely. Totally up to you.</p>
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Archives</h4>
          <ol class="list-unstyled mb-0">
            <li><a href="">March 2021</a></li>
            <li><a href="">February 2021</a></li>
            <li><a href="">January 2021</a></li>
            <li><a href="">December 2020</a></li>
            <li><a href="">November 2020</a></li>
            <li><a href="">October 2020</a></li>
            <li><a href="">September 2020</a></li>
            <li><a href="">August 2020</a></li>
            <li><a href="">July 2020</a></li>
            <li><a href="">June 2020</a></li>
            <li><a href="">May 2020</a></li>
            <li><a href="">April 2020</a></li>
          </ol>
        </div>

        <div class="p-4">
          <h4 class="fst-italic social-icons">Elsewhere</h4>
          <a href="https://linkedin.com/in/wnhollington" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary mx-1">
              <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>
          <a href="https://twitter.com/wnealhollington" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-secondary mx-1">
              <FontAwesomeIcon icon={faTwitter} size="2x"/>
          </a>
        </div>
        
      </div>
    </div>

  )
}

export default Sidebar