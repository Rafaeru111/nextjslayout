import { withAuth } from './helpers/withAuth';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Content for the protected page */}
    </div>
  );
}

export default withAuth(Dashboard);