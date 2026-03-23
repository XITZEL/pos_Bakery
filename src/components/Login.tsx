import { useState } from 'react';
import { loginConEmail } from '../api/auth';

// Le pasamos una "prop" llamada onLogin para avisarle a App.tsx cuando el usuario entre
export const Login = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginConEmail(email, password);
      onLogin(user); // Le avisamos a App.tsx que ya entramos
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Correo" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br /><br />
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <br /><br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};