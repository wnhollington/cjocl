import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

// Hooks
import { useSiteCategories } from "../../hooks/use-site-categories"

const Sidebar = ({ aboutSection="This text should change depending on whether someone imputs proper text"}) => {
  const categories = useSiteCategories();

  return (

    <div class="col-md-4">
      <div class="position-sticky" style={{top: '2rem'}}>
        
        <div class="p-4 mb-3 bg-light rounded">
          {aboutSection}
        </div>

        <div class="p-4">
          <h4 class="fst-italic">Archives</h4>
          <ol class="list-unstyled mb-0">
            {categories.map(({ node }) => {
              return <li className='mt-1' key={node.title}><Link to={`/${node.slug}`}>{node.title}</Link></li>
            })}
          </ol>
        </div>

        <div className="p-4">
          <h4 className="fst-italic">Subscribe</h4>
          <p>Tired of coming to us? We'll come to you. Enter your email address to receive notification of new posts by email.</p>
          <button className="btn btn-primary btn-round" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Subcribe</button>
        </div>

        <div class="p-4">
          <h4 class="fst-italic social-icons">Elsewhere</h4>
          <a href="https://linkedin.com/in/wnhollington" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
              <FontAwesomeIcon icon={faLinkedin} size="2x"/>
          </a>
          <a href="https://twitter.com/wnealhollington" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-primary mx-1">
              <FontAwesomeIcon icon={faTwitter} size="2x"/>
          </a>
        </div>
        
      </div>
    </div>

  )
}

export default Sidebar