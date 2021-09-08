
import Login from "../Login/Login"
import Dashboard from "../Dashboard/Dashboard"
import Registration from "../Registration/Registration"
import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom"

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
      </Router>
    </div>
  )
}

export default App

