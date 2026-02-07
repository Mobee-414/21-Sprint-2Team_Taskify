import LoginLogo from '@/pages/login/components/LoginLogo';
import LoginWelcomMessage from './components/LoginWelcomeMessage';
import LoginForm from '@/pages/login/components/LoginForm';
import LoginSignupLink from '@/pages/login/components/LoginSignupLink';


const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-gray-bg)]" >
      <LoginLogo />

      <div className='mt-2'>
        <LoginWelcomMessage />
      </div>

      <div className='mt-2'>
        <LoginForm />
      </div>

      <div className='mt-2'>
        <LoginSignupLink />
      </div>
    </div>
  );
};

export default Login;