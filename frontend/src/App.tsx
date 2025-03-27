import { Routes, Route } from 'react-router-dom';
import SignUp from './Pages/customer/signUp';
import SignIn from './Pages/customer/signIn';
import Dashboard from './Pages/customer/dashBoard';
import Layout from './Components/Layout';

function App() {
  return (
    <Routes>
      
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path='/' element={<Layout/>}>

      <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
