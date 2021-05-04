import './Footer.scss';
import utils from '../../utilities/utils';

const Footer = ({ theme, toggleTheme }) => {

  const repoUrl = 'https://github.com/jasonflorentino/vaccine-to-slots';

  return (
    <footer className={`Footer${utils.hasDarkClass(theme)}`}>
      <h3 className="Footer__madeBy">Made with ❤️&nbsp; by&nbsp;
        <a 
          href={repoUrl} 
          className={`Footer__link${utils.hasDarkClass(theme)}`}
          target='_blank' 
          rel='noreferrer'
        >
          Jason Florentino&nbsp;
          <i className="fas fa-external-link-alt"></i>
        </a>
      </h3>
      <div className="Footer__themeToggle">
        ☀️
        <label className="switch">
          <input type="checkbox" checked={theme === "dark" ? true : false} readOnly />
          <span className="slider round" onClick={toggleTheme}></span>
        </label>
        🌙
      </div>
    </footer>
  );
};

export default Footer;