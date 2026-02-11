import "@/App.css";
import { FynnyDashboard } from "@/components/fynny";
import { UserProvider } from "@/context/UserContext";

function App() {
  return (
    <UserProvider>
      <FynnyDashboard />
    </UserProvider>
  );
}

export default App;
