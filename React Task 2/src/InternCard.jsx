function Intern({ name, role, team }) {
  return (
    <article className="card">
      <div className="avatar">{name.charAt(0)}</div>
      <h2>{name}</h2>
      <p className="role">{role}</p>
      <span className="team">{team}</span>
    </article>
  );
}

export default Intern;