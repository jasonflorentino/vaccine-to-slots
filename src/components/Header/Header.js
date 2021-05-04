import './Header.scss';

const Header = ({ updateTime }) => {

  const bookingUrl = "https://vaccineto.ca/sites";

  return (
    <header className="Header">
      <h1 className="Header__heading">🧬 Vaccine TO Slots</h1>
      <div className="Header__detailsContainer">
        <div>
          <h2 className="Header__updateTitle">Last Updated</h2>
          <p className="Header__updateTime">{updateTime}</p>
        </div>
        <div className="Header__actions">
          <button 
            onClick={() => window.location.reload()}
            className="Header__button"
          >
            Refresh
          </button>
          <a 
            href={bookingUrl}
            className="Header__bookingsLink"
            target='_blank' 
            rel='noreferrer'
          >
            Go to Bookings&nbsp;
            <i className="fas fa-external-link-alt"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;