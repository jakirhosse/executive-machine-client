import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import { Router } from './Routes/Router.jsx'
import {QueryClient, QueryClientProvider} from 'react-query'
import AuthProvider from './provider/AuthProvider.jsx'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ThemeProvider>
   <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={Router}>
    <App />
    </RouterProvider>
    </QueryClientProvider>
    </AuthProvider>
   </ThemeProvider>
  </React.StrictMode>
)
