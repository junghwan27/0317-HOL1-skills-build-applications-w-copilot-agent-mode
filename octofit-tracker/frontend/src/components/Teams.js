import { useEffect, useState } from 'react';

const CODESPACE_NAME = process.env.REACT_APP_CODESPACE_NAME;
const API_BASE = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';
const TEAMS_ENDPOINT = `${API_BASE}/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  async function fetchTeams() {
    try {
      setLoading(true);
      setError('');
      console.log('Teams API endpoint:', TEAMS_ENDPOINT);
      const response = await fetch(TEAMS_ENDPOINT);
      if (!response.ok) {
        throw new Error('Failed to load teams');
      }
      const payload = await response.json();
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.results)
          ? payload.results
          : [];
      console.log('Teams API data:', data);
      setTeams(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  const filteredTeams = teams.filter((team) =>
    team.name?.toLowerCase().includes(query.toLowerCase())
    || team.universe?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="card app-card">
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <h2 className="h4 mb-0">Teams</h2>
          <div className="d-flex gap-2">
            <a className="btn btn-link p-0" href={TEAMS_ENDPOINT} target="_blank" rel="noreferrer">API Link</a>
            <button type="button" className="btn btn-primary btn-sm" onClick={fetchTeams}>Refresh</button>
          </div>
        </div>

        <form className="row g-2 mb-3" onSubmit={(event) => event.preventDefault()}>
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Search by team or universe"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </form>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle app-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Universe</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.universe}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Teams;
