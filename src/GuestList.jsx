export default function GuestList({ guests, loading, onSelect }) {
    return (
      <>
        {loading ? <p className="muted">Loading guests…</p> : null}
  
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
  
          <tbody>
            {guests.map((g, idx) => (
              <tr
                key={g.id ?? idx}
                className="row"
                onClick={() => onSelect(g.id)}
                role="button"
                tabIndex={0}
              >
                <td>{g.name}</td>
                <td className="mono">{g.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <p className="hint">Select a guest to see more details.</p>
      </>
    );
}