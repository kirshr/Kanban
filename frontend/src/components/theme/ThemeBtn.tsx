import React, { FC } from 'react'
import "./ThemeBtn.scss"
import IconDarkTheme from '../../assets/IconDarkTheme'
import IconLightTheme from '../../assets/IconLightTheme'
interface ThemeBtnProps {
  
}

const ThemeBtn: FC<ThemeBtnProps> = ({  }) => {
  return (
    <div className="theme">
        <IconLightTheme />
        <div className="dark-mode-toggle">
            <input type="checkbox" id='darkmode-toggle' />
            <label htmlFor="darkmode-toggle"></label>
        </div>
        <IconDarkTheme />
    </div>
  )
}

export default ThemeBtn;