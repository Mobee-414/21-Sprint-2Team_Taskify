import SignupPage from '@/pages/signup/SignupPage';
import RedirectRoute from '@/components/common/RedirectRoute';

export default function signup() {
  return (
    <RedirectRoute>
      <SignupPage />;
    </RedirectRoute>
  );
};