import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');

  useEffect(() => {
    setSession(supabase.auth.getSession());
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploadMessage('');
    const { data, error } = await supabase.storage.from('hash-uploads').upload(`${session.user.id}/${file.name}`, file);
    if (error) setUploadMessage(error.message);
    else setUploadMessage('File uploaded successfully!');
  };

  if (!session || !session.data?.session) {
    return (
      <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
          <button type="submit" disabled={loading}>Login</button>
        </form>
        <h3>or Register</h3>
        <form onSubmit={handleRegister}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required /><br />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
          <button type="submit" disabled={loading}>Register</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Welcome, {session.data.session.user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
      <h3>Upload Hash File</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default App;
