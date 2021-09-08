import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import '../Login/Login.css';

const Login = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/registration');
  };

  return (
    <Container className='login-container'>
      <Row>
        <Col>
          <Form className='form-container'>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Email'
                name='email'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Password'
                name='password'
                aria-describedby='basic-addon1'
                type='password'
              />
            </InputGroup>

            <div className='d-grid gap-2 col-6 mx-auto'>
              <button className='btn btn-success' type='button'>
                Login
              </button>

              <input
                type='button'
                className='btn btn-success'
                value='SignUp'
                onClick={handleClick}
              />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
