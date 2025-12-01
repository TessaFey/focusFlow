export default function Tasks() {
  return (
    <main>
      <div className="flex bg-white/5 p-5 m-3 rounded-xl">
        <div className="flex-1 p-4 bg-black/15 rounded-l-xl">
          <ul>
            <li>Today</li>
            <li>Upcoming</li>
          </ul>
        </div>
        <div className="flex-4 p-4 bg-black/22 rounded-r-xl">
          <h1>Today</h1>
          <ul>
            <h2>My projects</h2>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
            <li>
              <input type="checkbox"></input>a
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
