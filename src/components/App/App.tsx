import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Login} />
        <Route exact path='/registration' component={Registration} />
      </Router>
    </div>
  );
};

export default App;
