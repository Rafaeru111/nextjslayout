import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth(Component) {
  return function WithAuth(props) {
    const router = useRouter();

    useEffect(() => {
      checkAccess();
    }, []);

    const checkAccess = async () => {


      // auth logic check for validity ng token kung meron o wala
      const isAuthenticated = checkTokenValidity();

      if (!isAuthenticated) {
        router.push('/login');
      }
    };

    const checkTokenValidity = () => {

        // check the token
      const token = localStorage.getItem('token');

      return !!token; //return the tken update
    };

    return <Component {...props} />;
  };
}