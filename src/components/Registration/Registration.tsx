import { ChangeEvent, FormEvent, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import backend from '../../backend/backend';
const Registration = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, surname, email, password, password2 } = user;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      alert('Please enter all the field');
    } else if (password !== password2) {
      alert('Password do not match');
    } else {
      await backend.post('/auth/register', user);
      console.log('new User register');

      history.push('/');
    }
  };
  return (
    <Container className='login-container'>
      <Row>
        <Col>
          <Form className='form-container' onSubmit={onSubmit}>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your First Name'
                name='name'
                aria-describedby='basic-addon1'
                value={name}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Last Name'
                name='surname'
                aria-describedby='basic-addon1'
                value={surname}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Email'
                name='email'
                aria-describedby='basic-addon1'
                value={email}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Set Password'
                name='password'
                aria-describedby='basic-addon1'
                type='password'
                value={password}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Re-type Password'
                name='password2'
                aria-describedby='basic-addon1'
                type='password'
                value={password2}
                onChange={onChange}
              />
            </InputGroup>

            <div className='d-grid gap-2 col-6 mx-auto mb-3'>
              <button className='btn btn-success' type='submit'>
                SignUp
              </button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
