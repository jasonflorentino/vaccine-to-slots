import './Header.scss';

const Header = ({ updateTime }) => {
  return (
    <header className="Header">
      <h1 className="Header__heading">🧬 Vaccine TO Slots</h1>
      <h2 className="Header__updateTitle">Last Updated</h2>
      <p className="Header__updateTime">{updateTime}</p>
    </header>
  );
};

export default Header;