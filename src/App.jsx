// ROUTER

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// PAGES
// import Homepage from './pages/Homepage';
// import Pricing from './pages/Pricing';
// import AppLayout from './pages/AppLayout';
// import Product from './pages/Product';
// import PageNotFound from './pages/PageNotFound';
// import Login from './pages/Login';

// COMPONENTS
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// Context
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/facAuthContext';

import ProtectedRoute from './pages/ProtectedRoute';
import { lazy, Suspense } from 'react';

//Bundles spites 
const Homepage = lazy(() => import('./pages/Homepage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const Product = lazy(() => import('./pages/Product'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Login = lazy(() => import('./pages/Login'));

function App() {

  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />} >

            <Routes >
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='price' element={<Pricing />} />

              <Route path='app' element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              } >
                <Route index element={<Navigate replace to='cites' />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='cites' element={<CityList />} />
                <Route path='form' element={<Form />} />
                <Route path='cites/:id' element={<City />} />
              </Route>

              <Route path='login' element={<Login />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
