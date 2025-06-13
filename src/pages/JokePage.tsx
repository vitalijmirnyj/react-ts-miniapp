import { useEffect, useState } from 'react';

function JokePage() {
  const [joke, setJoke] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const fetchJoke = async () => {
    try {
      const res = await fetch('https://api.chucknorris.io/jokes/random?category=dev');
      const data = await res.json();
      setJoke(data.value);
      const now = new Date().toLocaleString();
      setLastUpdated(now);
    } catch {
      setJoke('Nepavyko gauti juokelio.');
    }
  };

  useEffect(() => {
    fetchJoke();
    const id = setInterval(fetchJoke, 15000);
    setIntervalId(id);
    return () => {
      if (intervalId) clearInterval(intervalId);
      clearInterval(id);
    };
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f7f7f7'
      }}
    >
      <div
        style={{
          padding: '30px',
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          textAlign: 'center'
        }}
      >
        <p style={{ fontSize: '20px', lineHeight: '1.6' }}>{joke}</p>
        <p style={{ fontSize: '12px', color: 'gray', marginTop: '15px' }}>
          Paskutinį kartą atnaujinta: {lastUpdated}
        </p>
      </div>
    </div>
  );
}

export default JokePage;