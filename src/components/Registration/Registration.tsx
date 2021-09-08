import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
const Registration = () => {
  return (
    <Container className='login-container'>
      <Row>
        <Col>
          <Form className='form-container'>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your First Name'
                name='fname'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Last Name'
                name='lname'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Enter your Email'
                name='email'
                aria-describedby='basic-addon1'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Set Password'
                name='password'
                aria-describedby='basic-addon1'
                type='password'
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <FormControl
                placeholder='Re-type Password'
                name='password'
                aria-describedby='basic-addon1'
                type='password'
              />
            </InputGroup>

            <div className='d-grid gap-2 col-6 mx-auto mb-3'>
              <button className='btn btn-success' type='button'>
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
