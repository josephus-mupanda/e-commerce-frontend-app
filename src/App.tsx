import { AppProvider } from "@/contexts/AppContext";
import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  return (
    <div className="font-bodyFont">
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </div>
  );
}

export default App;
