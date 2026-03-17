import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const linkClassName = ({ isActive }) =>
    `nav-link${isActive ? ' active fw-semibold' : ''}`;

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark app-nav">
        <div className="container">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2">
            <img src="/octofitapp-small.png" alt="OctoFit logo" className="app-logo" />
            OctoFit Tracker
          </span>
          <div className="navbar-nav ms-auto gap-2">
            <NavLink className={linkClassName} to="/users">Users</NavLink>
            <NavLink className={linkClassName} to="/teams">Teams</NavLink>
            <NavLink className={linkClassName} to="/activities">Activities</NavLink>
            <NavLink className={linkClassName} to="/leaderboard">Leaderboard</NavLink>
            <NavLink className={linkClassName} to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <section className="card app-hero mb-4">
          <div className="card-body d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <h1 className="h3 mb-1">Fitness Dashboard</h1>
              <a className="link-primary" href="/api/" target="_blank" rel="noreferrer">
                Open API Root
              </a>
            </div>
            <form className="row g-2 align-items-center" onSubmit={(event) => event.preventDefault()}>
              <div className="col-auto">
                <input className="form-control form-control-sm" placeholder="Quick search (UI demo)" />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setShowHelpModal(true)}
                >
                  UI Help
                </button>
              </div>
            </form>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/activities" replace />} />
        </Routes>
      </main>

      {showHelpModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">UI Components Guide</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowHelpModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-0">
                    This app uses Bootstrap navigation, tables, forms, links, buttons, cards, and modal
                    patterns consistently across all pages.
                  </p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" onClick={() => setShowHelpModal(false)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show app-modal-backdrop" />
        </>
      )}
    </div>
  );
}

export default App;
