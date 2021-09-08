import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import './ProfileOffCanvas.css';
import { FaPen } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
const ProfileOffCanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Launch
      </Button>

      <Offcanvas show={show} onHide={handleClose} className='off-canvas-body'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='text-center'>
            <Image
              className='profile-img'
              src='data:image/jpeg;base64,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'
              roundedCircle
            />
            <AiFillCamera className='edit-img-top' size='2em' />
          </div>

          <div className='col'>
            <div className='row'>
              <p className='user-name mt-3'>Your Name</p>
              <div className='col d-flex justify-content-between mt-1'>
                <h4>Viren</h4>
                <FaPen className='mt-1 mr-2' />
              </div>
            </div>
            <div className='col'>
              <p className='user-name mt-3'>About</p>
              <div className='col d-flex text-break justify-content-between mt-1'>
                <div className='col-9'>
                  <p className=''>
                    Viren
                    cvbusduivbdsuivbuisdbvuidfasvgsuibvuidfsgvuidfsbvyuidfbvd
                  </p>
                </div>

                <FaPen className='mt-1 mr-2' />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProfileOffCanvas;
