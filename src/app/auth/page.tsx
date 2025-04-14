import SignupForm from '@/components/SignupForm';
import LoginForm from '@/components/LoginForm';

const AuthenticationPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
      <SignupForm />
      <LoginForm />
    </div>
  );
};

export default AuthenticationPage;
