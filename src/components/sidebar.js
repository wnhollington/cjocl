import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faLinkedin,
  faTwitter
} from '@fortawesome/free-brands-svg-icons'

// Hooks
import { useSiteCategories } from "../hooks/use-site-categories"

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
              return <li className='mt-1'><Link to={`/${node.slug}`}>{node.name}</Link></li>
            })}
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