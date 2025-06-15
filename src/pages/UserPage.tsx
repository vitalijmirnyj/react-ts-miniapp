import { useState } from 'react';

type User = {
  name: string;
  position: string;
  gender: string;
  age: string;
};

type SortField = keyof User;
type SortDirection = 'asc' | 'desc';

function UserPage() {
  const [users, setUsers] = useState<User[]>([
    { name: 'Jonas', position: 'Programuotojas', gender: 'Vyras', age: '28' },
    { name: 'Asta', position: 'Vadovė', gender: 'Moteris', age: '34' },
    { name: 'Ona', position: 'Analitikė', gender: 'Moteris', age: '45' }
  ]);

  const [newUser, setNewUser] = useState<User>({
    name: '',
    position: '',
    gender: '',
    age: ''
  });

  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAdd = () => {
    if (newUser.name && newUser.position && newUser.gender && newUser.age) {
      setUsers([...users, newUser]);
      setNewUser({ name: '', position: '', gender: '', age: '' });
    }
  };

  const handleDelete = (index: number) => {
    const updated = [...users];
    updated.splice(index, 1);
    setUsers(updated);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...users];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setUsers(updated);
  };

  const moveDown = (index: number) => {
    if (index === users.length - 1) return;
    const updated = [...users];
    [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
    setUsers(updated);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    const sorted = [...users].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      if (field === 'age') {
        return direction === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      } else {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
    });
    setSortField(field);
    setSortDirection(direction);
    setUsers(sorted);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Vartotojų sąrašas</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <label>
          Rūšiuoti pagal:
          <select
            value={sortField}
            onChange={(e) => handleSortChange(e.target.value as SortField, sortDirection)}
            style={selectStyle}
          >
            <option value="name">Vardas</option>
            <option value="position">Pareigos</option>
            <option value="gender">Lytis</option>
            <option value="age">Amžius</option>
          </select>
        </label>

        <label>
          Kryptis:
          <select
            value={sortDirection}
            onChange={(e) => handleSortChange(sortField, e.target.value as SortDirection)}
            style={selectStyle}
          >
            <option value="asc">↑ A-Z / Didėjanti</option>
            <option value="desc">↓ Z-A / Mažėjanti</option>
          </select>
        </label>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...cellStyleHeader, borderTopLeftRadius: '20px' }}>Vardas</th>
            <th style={cellStyleHeader}>Pareigos</th>
            <th style={cellStyleHeader}>Lytis</th>
            <th style={cellStyleHeader}>Amžius</th>
            <th style={{ ...cellStyleHeader, borderTopRightRadius: '20px' }}>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td style={{ ...cellStyle, borderBottomLeftRadius: i === users.length - 1 ? '20px' : 0 }}>{user.name}</td>
              <td style={cellStyle}>{user.position}</td>
              <td style={cellStyle}>{user.gender}</td>
              <td style={cellStyle}>{user.age}</td>
              <td style={{ ...cellStyle, borderBottomRightRadius: i === users.length - 1 ? '20px' : 0 }}>
                <button onClick={() => handleDelete(i)} style={deleteButtonStyle}>Ištrinti</button>
                <button onClick={() => moveUp(i)} disabled={i === 0} style={iconButtonStyle}>↑</button>
                <button onClick={() => moveDown(i)} disabled={i === users.length - 1} style={iconButtonStyle}>↓</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="text" placeholder="Vardas" name="name" value={newUser.name} onChange={handleChange} style={inputStyle} />
        <input type="text" placeholder="Pareigos" name="position" value={newUser.position} onChange={handleChange} style={inputStyle} />
        <select name="gender" value={newUser.gender} onChange={handleChange} style={inputStyle}>
          <option value="">Pasirinkite lytį</option>
          <option value="Vyras">Vyras</option>
          <option value="Moteris">Moteris</option>
        </select>
        <input type="text" placeholder="Amžius" name="age" value={newUser.age} onChange={handleChange} style={inputStyle} />
        <button onClick={handleAdd} style={addButtonStyle}>Pridėti</button>
      </div>
    </div>
  );
}

const cellStyleHeader = {
  padding: '12px',
  textAlign: 'center' as const,
  backgroundColor: '#5b9bd8',
  color: '#fff',
  fontWeight: 600,
  borderBottom: 'none'
};

const cellStyle = {
  padding: '12px',
  textAlign: 'center' as const,
  backgroundColor: '#fff',
  borderTop: 'none',
  borderBottom: '1px solid #eee',
  borderLeft: 'none',
  borderRight: 'none'
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  backgroundColor: '#f9f9f9',
  minWidth: '150px'
};

const selectStyle = {
  padding: '8px',
  marginLeft: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  backgroundColor: '#fff'
};

const tableStyle = {
  borderCollapse: 'separate' as const,
  borderSpacing: 0,
  width: '100%',
  backgroundColor: '#fff',
  marginBottom: '30px',
  border: '1px solid #eee',
  borderRadius: '20px',
  overflow: 'hidden'
};

const addButtonStyle = {
  padding: '10px 16px',
  borderRadius: '6px',
  border: 'none',
  backgroundColor: '#5c9bd9',
  color: '#fff',
  cursor: 'pointer'
};

const deleteButtonStyle = {
  padding: '6px 10px',
  borderRadius: '6px',
  backgroundColor: '#ea6961',
  color: '#fff',
  border: 'none',
  marginRight: '8px',
  cursor: 'pointer'
};

const iconButtonStyle = {
  padding: '6px 10px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  backgroundColor: '#ffffff',
  cursor: 'pointer',
  marginRight: '5px'
};

export default UserPage;