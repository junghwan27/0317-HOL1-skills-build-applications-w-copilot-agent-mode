import { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';
const USERS_ENDPOINT = `${API_BASE}/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  async function fetchUsers() {
    try {
      setLoading(true);
      setError('');
      console.log('Users API endpoint:', USERS_ENDPOINT);
      const response = await fetch(USERS_ENDPOINT);
      if (!response.ok) {
        throw new Error('Failed to load users');
      }
      const payload = await response.json();
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : [];
      console.log('Users API data:', data);
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(query.toLowerCase())
      || user.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="card app-card">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h2 className="h4 mb-0">Users</h2>
          <div className="d-flex gap-2">
            <a className="btn btn-link p-0" href={USERS_ENDPOINT} target="_blank" rel="noreferrer">API Link</a>
            <button type="button" className="btn btn-primary btn-sm" onClick={fetchUsers}>Refresh</button>
          </div>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Search by name or email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle app-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Users;
