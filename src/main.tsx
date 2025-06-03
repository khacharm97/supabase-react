import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router"
import Home from "./components/Home.tsx";
import Dashboard from "./components/Dashboard.tsx";
import {AuthProvider} from "./contexts/auth/authContext.tsx";
import ProtectedRoute from "./routes/protectedRoute.tsx";
import Layout from "./components/Layout.tsx";
import Auth from "@/components/Auth.tsx";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <Layout>
                  <Routes>
                      <Route index element={<Home />} />
                      <Route path="dashboard" element={
                          <ProtectedRoute>
                              <Dashboard />
                          </ProtectedRoute>
                      } />
                      <Route path="/signin" element={<Auth />} />
                      <Route path="*" element={<Home />} />
                  </Routes>
              </Layout>
          </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
