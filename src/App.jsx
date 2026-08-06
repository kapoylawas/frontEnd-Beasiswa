//import routes
import Routes from './routes';

//import Toaster
import { Toaster } from 'react-hot-toast';

//import AutoUpdateChecker
import AutoUpdateChecker from './components/AutoUpdateChecker';

function App() {

  return (
    <>
      <AutoUpdateChecker />
      <Routes />
      <Toaster />
    </>
  )
}

export default App