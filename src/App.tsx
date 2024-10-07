import { Outlet } from "react-router";
function App() {
  return (
    <main className=" flex flex-col">
      <Outlet />
    </main>
  );
}

export default App;
