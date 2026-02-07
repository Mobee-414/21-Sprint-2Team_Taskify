import LoginLogo from '@/pages/login/components/LoginLogo';
import LoginWelcomMessage from './components/LoginWelcomeMessage';
import LoginForm from '@/pages/login/components/LoginForm';
import LoginSignupLink from '@/pages/login/components/LoginSignupLink';


const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoginLogo />
      <LoginWelcomMessage />
      <LoginForm />
      <LoginSignupLink />
    </div>
  )
}

export default Login;