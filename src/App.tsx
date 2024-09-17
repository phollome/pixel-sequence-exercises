import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="w-full flex flex-col h-dvh bg-zinc-900">
      <Outlet />
    </div>
  );
}

export default App;
