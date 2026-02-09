export default function GuestDetails({ guest, loading, onBack }) {
    return (
      <>
        <h2 className="subhead">Details</h2>
  
        {loading ? <p className="muted">Loading details…</p> : null}
  
        {guest ? (
          <div className="details">
            <div><span className="label">Name:</span> {guest.name}</div>
            <div><span className="label">Email:</span> <span className="mono">{guest.email}</span></div>
            <div><span className="label">Phone:</span> <span className="mono">{guest.phone}</span></div>
            <div><span className="label">Job:</span> {guest.job}</div>
            <div><span className="label">Bio:</span> {guest.bio}</div>
          </div>
        ) : (
          <p className="muted">No guest selected.</p>
        )}
  
        <button className="btn" onClick={onBack}>
          Back
        </button>
      </>
    );
}