import LoginLogo from '@/pages/login/components/LoginLogo';
import LoginWelcomMessage from './components/LoginWelcomeMessage';
import LoginForm from '@/pages/login/components/LoginForm';
import LoginSignupLink from '@/pages/login/components/LoginSignupLink';


const Login = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-bg'>
      <div className="flex-col items-center" >
        <LoginLogo />

        <div className='mt-4'>
          <LoginWelcomMessage />
        </div>

        <div className='mt-4'>
          <LoginForm />
        </div>

        <div className='mt-4 '>
          <LoginSignupLink />
        </div>
      </div>
    </div>
  );
};

export default Login;