import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Register from './Register';
import ShowTrips from './ShowTrips';
import CreateTrip from './CreateTrip';
import SingleTrip from './SingleTrip';

const App = () => {

  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trips" element={<ShowTrips />} />
        <Route path="/trips/:id" element={<SingleTrip />} />
        <Route path="/create" element={<CreateTrip />} />
        <Route path="*" element={<h3>Page not found!</h3>} />
      </Routes>
    </>
  )
};

export default App;
