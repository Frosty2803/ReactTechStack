import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginView } from './components/views/LoginView';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UsersListView } from './components/views/UsersListView';
import { RegisterView } from './components/views/RegisterView';

export function Router() {
    return (<BrowserRouter>
        <Routes>
          {/* Öffentliche Routen */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />

          {/* Geschützte Route */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <UsersListView />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </BrowserRouter>);
}