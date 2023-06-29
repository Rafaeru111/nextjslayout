import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    checkAuthentication();
  }, []);


    //check kung may token
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');


    //restrict the user if logged in na sya restric na makapunta sa login
    if (token) {
      router.push('/');
    }
  };

  // Login page content
  return (
    <div>
      <h1>Login</h1>
      {/* Login form and components */}
    </div>
  );
}