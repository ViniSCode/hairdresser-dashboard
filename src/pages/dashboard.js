import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { Loading } from '../components/Loading';
import { LoginError } from '../components/LoginError';
import { Logo } from "../components/Logo";
import { NavItems } from '../components/NavItems';
import { UserInfo } from "../components/UserInfo";
import { auth } from '../utils/firebase';

export function Dashboard () {
  
  const [user, loading] = useAuthState(auth);
  
  if (!loading && !user) {
    return <Navigate to="/" />
  }

  return user ? (
    <div className="max-w-[1120px] mx-auto grid grid-cols-sidebar px-4">
      <div>
        <Logo />
        <UserInfo username={user.displayName} avatar={user.photoURL} email={user.email}/>
        <NavItems />
      </div>
    </div>
  ) : loading ? (
    <Loading />
  ) : (
   <LoginError />
  )
}