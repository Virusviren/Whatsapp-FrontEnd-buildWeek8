import React, { FormEvent, useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { useHistory } from "react-router-dom"
import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import "../Login/Login.css"
import backend from "../../backend/backend"

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const history = useHistory()
  const handleClick = () => {
    history.push("/registration")
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await backend.post("/auth/login", credentials)
      history.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container className="login-container">
      <Row>
        <Col>
          <Form className="form-container" onSubmit={e => handleLogin(e)}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your Email"
                name="email"
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
              />
            </InputGroup>

            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-success" type="submit">
                Login
              </button>

              <input type="button" className="btn btn-success" value="SignUp" onClick={handleClick} />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
