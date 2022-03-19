import * as React from "react"
import { ThemeToggler } from "gatsby-plugin-dark-mode"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const DarkmodeToggle = () => {
  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => (
          <div className="toggle-theme px-3">
              <FontAwesomeIcon 
                  icon={theme === "dark" ? faSun : faMoon }
                  onClick={
                    () => {
                      theme === "dark" ? toggleTheme("light") : toggleTheme("dark")
                      var audio = document.getElementById("audio");
                      audio.play();
                    }
                  }
              />
              <audio id="audio" src="https://res.cloudinary.com/wnhollington/video/upload/v1647652546/mouseClick.mp3"></audio>
          </div>
      )}
    </ThemeToggler>
  )
}

export default DarkmodeToggle
