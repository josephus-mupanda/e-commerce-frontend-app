import { AppProvider } from "@/contexts/AppContext";
import { AppRoutes } from "@/routes/AppRoutes";
import { SessionTimeoutProvider } from "@/components/auth/SessionTimeoutProvider";

function App() {
  return (
    <div className="min-h-screen bg-transparent font-bodyFont">
      <AppProvider>
        <SessionTimeoutProvider>
          <AppRoutes />
        </SessionTimeoutProvider>
      </AppProvider>
    </div>
  );
}

export default App;
