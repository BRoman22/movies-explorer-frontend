import './Register.css';
import Logo from '../Logo/Logo';
import Form from '../Form/Form';

export default function Register({ handleRegister, isLoading }) {
  return (
    <main className='register'>
      <Logo />
      <Form handleRegister={handleRegister} isLoading={isLoading} />
    </main>
  );
}
