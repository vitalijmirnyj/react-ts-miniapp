import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useState } from 'react';
import UserPage from './pages/UserPage';
import JokePage from './pages/JokePage';

type User = {
  name: string;
  position: string;
  gender: string;
  age: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([
    { name: 'Jonas', position: 'Programuotojas', gender: 'Vyras', age: '28' },
    { name: 'Asta', position: 'Vadovė', gender: 'Moteris', age: '34' },
    { name: 'Ona', position: 'Analitikė', gender: 'Moteris', age: '45' }
  ]);

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
        <Route path="/users" element={<UserPage users={users} setUsers={setUsers} />} />
        <Route path="/jokes" element={<JokePage />} />
        <Route path="*" element={<UserPage users={users} setUsers={setUsers} />} />
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