import { Routes, Route } from 'react-router-dom';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
import Dashboard from './Pages/deshBoard';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
