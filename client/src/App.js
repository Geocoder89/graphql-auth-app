
import Layout from './components/Layout';
import {Route, Routes,Navigate} from 'react-router-dom'
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import {isAuthenticated} from './utils/isAuthenticated'
function App() {
  return (
   <Layout>
   <Routes>
   <Route path='/login' element={<LoginForm/>}/>
   <Route path='/signup' element={<SignupForm/>}/>
   <Route path='/dashboard' element={isAuthenticated()? <Dashboard/>: <Navigate to='/login'/>}/>
   </Routes>
   </Layout>
  );
}

export default App;
