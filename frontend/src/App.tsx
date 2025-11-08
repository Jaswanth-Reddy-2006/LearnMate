import AppProviders from './providers/AppProviders'
import AppRouter from './routes/AppRouter'
import Starfield from './components/effects/Starfield'

function App() {
  return (
    <AppProviders>
      <Starfield />
      <div className="relative z-10">
        <AppRouter />
      </div>
    </AppProviders>
  )
}

export default App
