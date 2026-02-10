import LoginLogo from '@/pages/login/components/LoginLogo';
import LoginWelcomMessage from '@/pages/login/components/LoginWelcomeMessage'
import SignupForm from '@/pages/signup/components/SignupForm';
import LoginLink from '@/pages/signup/components/LoginLink';

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoginLogo />

      <div className='mt-2'>
        <LoginWelcomMessage />
      </div>

      <div className='mt-2'>
        <SignupForm />
      </div>

      <div className='mt-2'>
        <LoginLink />
      </div>
    </div>
  )
}

export default Signup;