 //App.js
 import { Route, Routes } from 'react-router-dom';
 import Home from './pages/Home';
 import About from './pages/About';
 import Chat from './pages/Chat';

 function App() {
   return (
     <div className="App">
        <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/about' element={<About/>} />
         <Route path='/chat' element={<Chat/>} />
       </Routes>
     </div>
   );
 }

 export default App;