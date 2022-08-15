import React from 'react'
import Main from './components/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import { RecoilRoot } from 'recoil'
import SignIn from './components/SignIn'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

const App = () => {
  return (
    <QueryClientProvider client={client}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  )
}

export default App
