import LoginPage from '@/pages/login/LoginPage';
import RedirectRoute from '@/components/common/RedirectRoute';

export default function Login() {
  return (
    <RedirectRoute>
      <LoginPage />
    </RedirectRoute>
  );
};