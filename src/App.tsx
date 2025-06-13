import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import UserPage from './pages/UserPage';
import JokePage from './pages/JokePage';

function App() {
  return (
    <>
      <nav
        style={{
          padding: '20px',
          background: '#5b9bd8',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '20px',
          paddingLeft: '40px'
        }}
      >
        <NavLink
          to="/users"
          style={({ isActive }) => (isActive ? activeNavButtonStyle : navLinkStyle)}
        >
          Vartotojai
        </NavLink>
        <NavLink
          to="/jokes"
          style={({ isActive }) => (isActive ? activeNavButtonStyle : navLinkStyle)}
        >
          Juokeliai
        </NavLink>
      </nav>

      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/jokes" element={<JokePage />} />
        <Route path="*" element={<UserPage />} />
      </Routes>
    </>
  );
}

const navLinkStyle = {
  padding: '5px 20px',
  backgroundColor: 'transparent',
  color: '#ffffff',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 600,
};

const activeNavButtonStyle = {
  ...navLinkStyle,
  backgroundColor: '#3f7ebf',
  border: '1px solid #366ca3'
};

export default App;