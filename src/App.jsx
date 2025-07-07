import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleRegister = async (email, password) => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setError('Registration successful! Please check your email to confirm your account.');
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
    setUploading(true);
    setUploadMessage('');
    const { data, error } = await supabase.storage.from('hash-uploads').upload(`${session.user.id}/${file.name}`, file);
    if (error) setUploadMessage(error.message);
    else setUploadMessage('File uploaded successfully!');
    setUploading(false);
  };

  return (
    <div>
      <Header user={session?.user} onLogout={handleLogout} />
      {!session ? (
        <AuthForm
          onLogin={handleLogin}
          onRegister={handleRegister}
          loading={loading}
          error={error}
        />
      ) : (
        <Dashboard
          user={session.user}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          uploadMessage={uploadMessage}
          loading={uploading}
        />
      )}
    </div>
  );
}

export default App;
