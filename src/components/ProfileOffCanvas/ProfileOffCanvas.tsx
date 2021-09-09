import React, {
  useState,
  useRef,
  ChangeEvent,
  ChangeEventHandler,
} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Image from 'react-bootstrap/Image';
import './ProfileOffCanvas.css';
import { FaPen, FaCheck } from 'react-icons/fa';
import { AiFillCamera } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import {
  selectCanvasStatus,
  selectUserData,
  toggleCanvas,
} from '../../redux/slices/userSlice';

const ProfileOffCanvas = () => {
  const user = useAppSelector(selectUserData);
  const isCanvasOpen = useAppSelector(selectCanvasStatus);
  const dispatch = useAppDispatch();
  // const [show, setShow] = useState(false)

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)
  let userName = 'Viren';
  let status = 'fsdkjbvsdjklabvdjkasbvdiosbvsdo';
  const [name, setName] = useState(userName);
  const [about, setAbout] = useState(status);
  const [inputFieldAbout, setInputFieldAbout] = useState(false);
  const [inputFieldName, setInputFieldName] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const uploadImage = () => {
    fileRef.current?.click();
  };
  const changeName = () => {
    console.log(name);
    setInputFieldName(false);
  };
  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('hello handleChange');
    setName(event.currentTarget.value);
  };
  const handleChangeAbout = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('hello handleChange');
    setAbout(event.currentTarget.value);
  };
  const changeAbout = () => {
    console.log(status);
    setInputFieldAbout(false);
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas
        show={isCanvasOpen}
        onHide={() => dispatch(toggleCanvas())}
        className='off-canvas-body'
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className='text-center common'>
              <Image
                className='profile-img profile-img-hover'
                src={user.avatar}
                roundedCircle
              />

              <input
                type='file'
                accept='image/gif,image/jpeg,image/jpg,image/png'
                style={{ display: 'none' }}
                id='imageClick'
                ref={fileRef}
              />
              <AiFillCamera
                className='edit-img-top middle-over-lay edit-icons'
                size='2em'
                onClick={uploadImage}
              />
            </div>
          </div>

          <div className='col'>
            {!inputFieldName ? (
              <div className='row'>
                <p className='user-name mt-3'>Your Name</p>
                <div className='col d-flex justify-content-between mt-1'>
                  <h4>{name}</h4>
                  <FaPen
                    className='mt-1 mr-2 edit-icons'
                    onClick={() => setInputFieldName(true)}
                  />
                </div>
              </div>
            ) : (
              <div className='row'>
                <p className='user-name mt-3'>Edit Name</p>
                <div className='col d-flex justify-content-between mt-1'>
                  <input type='text' value={name} onChange={handleChangeName} />
                  <FaCheck
                    className='mt-1 mr-2 edit-icons'
                    onClick={changeName}
                  />
                </div>
              </div>
            )}

            <div className='col'>
              {!inputFieldAbout ? (
                <div>
                  <p className='user-name mt-3'>About</p>
                  <div className='col d-flex text-break justify-content-between mt-1'>
                    <div className='col-9'>
                      <p className=''>{about}</p>
                    </div>

                    <FaPen
                      className='mt-1 mr-2 edit-icons'
                      onClick={() => setInputFieldAbout(true)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className='user-name mt-3'>Edit About</p>
                  <div className='col d-flex text-break justify-content-between mt-1'>
                    <div className='col-9'>
                      <input
                        type='text'
                        value={about}
                        onChange={handleChangeAbout}
                      />
                    </div>

                    <FaCheck
                      className='mt-1 mr-2 edit-icons'
                      onClick={changeAbout}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProfileOffCanvas;
