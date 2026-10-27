import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, lazy: () => import('./pages/Home'), entry: 'src/pages/Home.tsx' },
      {
        path: 'portfolio/:ambiente',
        lazy: () => import('./pages/Ambiente'),
        entry: 'src/pages/Ambiente.tsx',
      },
      { path: 'sobre', lazy: () => import('./pages/Sobre'), entry: 'src/pages/Sobre.tsx' },
      {
        path: 'privacidade',
        lazy: () => import('./pages/Privacidade'),
        entry: 'src/pages/Privacidade.tsx',
      },
      { path: '404', lazy: () => import('./pages/NotFound'), entry: 'src/pages/NotFound.tsx' },
      { path: '*', lazy: () => import('./pages/NotFound'), entry: 'src/pages/NotFound.tsx' },
    ],
  },
]
