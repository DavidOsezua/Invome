import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import { AppShell } from "./layout/AppShell";
import { Dashboard } from "./pages/Dashboard";
import { InvoiceNew } from "./pages/InvoiceNew";
import { InvoicesList } from "./pages/InvoicesPage";
import { Settings } from "./pages/Settings";
import { ClientsList } from "./pages/ClientsList";
import ReportsPage from "./pages/ReportsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth" element={<AuthLayout />}>
          <Route index path="login" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>

        <Route path="/" element={<LandingPage />} />

        <Route path="app" element={<AppShell />}>
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="invoices" element={<InvoicesList />} />
          <Route path="invoices/newinvoice" element={<InvoiceNew />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<ReportsPage/>} />
          <Route path="clients" element={<ClientsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
