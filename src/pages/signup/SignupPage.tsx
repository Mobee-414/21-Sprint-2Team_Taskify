import LoginLogo from '@/pages/login/components/LoginLogo';
import LoginWelcomMessage from '@/pages/login/components/LoginWelcomeMessage'
import SignupForm from '@/pages/signup/components/SignupForm';
import LoginLink from '@/pages/signup/components/LoginLink';

const Signup = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-bg'> 
      <div className="flex-col items-center">
        <LoginLogo />

        <div className='mt-4'>
          <LoginWelcomMessage />
        </div>

        <div className='mt-4'>
          <SignupForm />
        </div>
        
        <div className='mt-4'>
          <LoginLink />
        </div>
      </div>
    </div>
  )
}

export default Signup;