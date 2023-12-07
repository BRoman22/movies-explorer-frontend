import './Login.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

export default function Login({ handleLogin, isLoading }) {
  return (
    <main className='login'>
      <Logo />
      <Form handleLogin={handleLogin} isLoading={isLoading} />
    </main>
  );
}
