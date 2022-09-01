import { render, screen, waitFor } from '@testing-library/react'
import SignIn from '../components/SignIn'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
})

describe('SignIn', () => {
  it('test', async () => {
    render(
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <RecoilRoot>
            <SignIn />
          </RecoilRoot>
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(screen.getByTestId('email')).toHaveValue('')
    // eslint-disable-next-line testing-library/await-async-utils
    waitFor(() => {
      // eslint-disable-next-line testing-library/no-wait-for-side-effects
      userEvent.type(screen.getByTestId('email'), 'hanako@example.com')
    })
    screen.getByTestId('email')
    expect(screen.getByTestId('email')).toHaveValue('hanako@example.com')
  })
})
