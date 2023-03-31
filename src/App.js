import logo from './logo.svg';
import './App.css';
import HomePage from './components/Homepage';
import { Route, Routes } from 'react-router-dom';
import EditFile from './components/EditFile';
import ViewCommits from './components/ViewCommits';
import CreateRepository from './components/CreateRepository';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';


function App() {
  return (
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/editFile/:id' element={<EditFile/>}/>
      <Route path='/commits/:id'element={<ViewCommits/>}/>
      <Route path='/create'element={<CreateRepository/>}/>
      <Route path='/logIn'element={<LogIn/>}/>
      <Route path='/signUp'element={<SignUp/>}/>

    </Routes>
  );
}

export default App;
