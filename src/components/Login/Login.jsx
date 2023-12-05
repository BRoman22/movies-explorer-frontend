import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

export default function Login({ handleLogin }) {
  return (
    <main className='login'>
      <Logo />
      <Form handleLogin={handleLogin} />
    </main>
  );
}
