import * as React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const DarkmodeToggle = ({state, setState}) => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
          <div className="toggle-theme px-3">
              <FontAwesomeIcon
                  id="test"
                  icon={theme === "dark" ? faSun : faMoon }
                  onClick={
                    () => {
                      theme === "dark" ? toggleTheme("light") : toggleTheme("dark")
                      setState({
                        ...state,
                        dark: !state.dark,
                      })
                    }
                  }
              />
             
          </div>
      )}
    </ThemeToggler>
  )
}

export default DarkmodeToggle
