import { FC, useState, useEffect } from 'react';
import './ThemeBtn.scss';
import IconDarkTheme from '../../assets/IconDarkTheme';
import IconLightTheme from '../../assets/IconLightTheme';

interface ThemeBtnProps {}

const ThemeBtn: FC<ThemeBtnProps> = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Initialize isDarkMode state from local storage, or default to false
    const savedIsDarkMode = localStorage.getItem('isDarkMode');
    return savedIsDarkMode !== null ? JSON.parse(savedIsDarkMode) : false;
  });

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkMode) {
      body?.classList.add('dark-mode');
    } else {
      body?.classList.remove('dark-mode');
    }
    // Save isDarkMode state to local storage
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <div className="theme">
      <IconLightTheme />
      <div className="dark-mode-toggle">
        <input type="checkbox" id="darkmode-toggle" checked={isDarkMode} onChange={handleToggleChange} />
        <label htmlFor="darkmode-toggle"></label>
      </div>
      <IconDarkTheme />
    </div>
  );
};

export default ThemeBtn;
