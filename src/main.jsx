import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import DialogContext from "./ctx/DialogContext.jsx"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            onError: (error) => {
                console.error('Query error:', error)
            }
        },
        mutations: {
            onError: (error) => {
                console.error('Mutation error:', error)
            }
        }
    }
})

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <DialogContext>
                <App />
            </DialogContext>
        </QueryClientProvider>
    </BrowserRouter>
)
