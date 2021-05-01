import './Footer.scss';

const Footer = ({ theme, toggleTheme }) => {

  const jasonGitHubUrl = 'https://github.com/jasonflorentino';

  return (
    <footer className={`Footer${theme === "dark" ? "--dark" : ""}`}>
      <h3 className="Footer__madeBy">Made with ❤️&nbsp; by&nbsp;
        <a 
          href={jasonGitHubUrl} 
          className={`Footer__link${theme === "dark" ? "--dark" : ""}`}
          target='_blank' 
          rel='noreferrer'
        >
          Jason Florentino&nbsp;
          <i class="fas fa-external-link-alt"></i>
        </a>
      </h3>
      <div className="Footer__themeToggle">
        ☀️
        <label className="switch">
          <input type="checkbox" checked={theme === "dark" ? true : false} />
          <span className="slider round" onClick={toggleTheme}></span>
        </label>
        🌙
      </div>
    </footer>
  );
};

export default Footer;