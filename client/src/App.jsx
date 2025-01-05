import { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "./pages/heroPage";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import { ROUTES } from "./routes/routes.js";
import { Loading } from "./components/index.js";
import useDarkMode from "./hooks/useDarkMode.jsx";
import { Layout } from "./pages/layout/index.js";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Sale from "./pages/sales/Sale.jsx";
import InvoiceForm from "./components/InvoiceForm.jsx";
function App() {
  const [isDarkMode] = useDarkMode();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const isAuth = useSelector((state) => state.userAuth);
  return (
    <>
      {!isAuthenticated ? (
        <Hero />
      ) : (
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Dashboard />} />
              <Route path={ROUTES.SALE} element={<Sale />} />
              <Route path={ROUTES.InvoiceForm} element={<InvoiceForm />} />
            </Routes>
          </Suspense>
        </Layout>
      )}
    </>
  );
}

export default App;
