import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const Explore = lazy(() => import('../pages/Explore'));
const SearchPage = lazy(() => import('../pages/SearchPage'));
const DetailsPage = lazy(() => import('../pages/DetailsPage'));

const withSuspense = (Component) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: withSuspense(Home) },
      { path: ':explore', element: withSuspense(Explore) },
      { path: ':explore/:id', element: withSuspense(DetailsPage) },
      { path: 'search', element: withSuspense(SearchPage) },
    ],
  },
]);

export default router;
