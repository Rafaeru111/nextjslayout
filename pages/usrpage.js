import { withAuth } from './helpers/withAuth';

function Userpage() {
  return (
    <div>
      <h1>Userpage</h1>
      {/* Content for the protected page */}
    </div>
  );
}

export default withAuth(Userpage);
