import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import { useState, FormEvent } from "react"
import { useHistory } from "react-router-dom"

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import backend from "../../backend/backend"
import { Alert } from "react-bootstrap"
const Registration = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  })
  const [secondPassword, setSecondPassword] = useState("")
  const [error, setError] = useState("")

  const history = useHistory()

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await backend.post("/auth/register", credentials)
      history.push("/")
    } catch (error) {
      setError("Email already exists")
    }
  }

  return (
    <Container className="login-container">
      <Row>
        <Col>
          <Form className="form-container" onSubmit={handleLogin}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your First Name"
                name="fname"
                value={credentials.name}
                onChange={e => setCredentials({ ...credentials, name: e.target.value })}
                isValid={credentials.name.length > 0}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your Last Name"
                name="lname"
                value={credentials.surname}
                onChange={e => setCredentials({ ...credentials, surname: e.target.value })}
                isValid={credentials.surname.length > 0}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter your Email"
                name="email"
                value={credentials.email}
                onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                isValid={credentials.email.split("@").length === 2}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Set Password"
                name="password"
                value={credentials.password}
                onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                type="password"
                isValid={secondPassword === credentials.password && secondPassword !== ""}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Re-type Password"
                name="password"
                value={secondPassword}
                onChange={e => setSecondPassword(e.target.value)}
                type="password"
                isInvalid={secondPassword === credentials.password ? false : true}
                isValid={secondPassword === credentials.password && secondPassword !== ""}
              />
            </InputGroup>

            <div className="d-grid gap-2 col-6 mx-auto mb-3">
              <button className="btn btn-success" type="submit">
                SignUp
              </button>
              {error && (
                <Alert className="m-0 p-1 text-center" variant="danger">
                  {error}
                </Alert>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Registration
