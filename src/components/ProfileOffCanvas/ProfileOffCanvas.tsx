import React, { useState, useRef } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Image from "react-bootstrap/Image"
import "./ProfileOffCanvas.css"
import { FaPen } from "react-icons/fa"
import { AiFillCamera } from "react-icons/ai"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { selectCanvasStatus, selectUserData, toggleCanvas } from "../../redux/slices/userSlice"

const ProfileOffCanvas = () => {
  const user = useAppSelector(selectUserData)
  const isCanvasOpen = useAppSelector(selectCanvasStatus)
  const dispatch = useAppDispatch()
  // const [show, setShow] = useState(false)

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  const fileRef = useRef<HTMLInputElement>(null)

  const uploadImage = () => {
    fileRef.current?.click()
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch
      </Button> */}

      <Offcanvas show={isCanvasOpen} onHide={() => dispatch(toggleCanvas())} className="off-canvas-body">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="text-center common">
              <Image className="profile-img profile-img-hover" src={user.avatar} roundedCircle />

              <input
                type="file"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                style={{ display: "none" }}
                id="imageClick"
                ref={fileRef}
              />
              <AiFillCamera className="edit-img-top middle-over-lay" size="2em" onClick={uploadImage} />
            </div>
          </div>

          <div className="col">
            <div className="row">
              <p className="user-name mt-3">Your Name</p>
              <div className="col d-flex justify-content-between mt-1">
                <h4>{user.name}</h4>
                <FaPen className="mt-1 mr-2" />
              </div>
            </div>
            <div className="col">
              <p className="user-name mt-3">About</p>
              <div className="col d-flex text-break justify-content-between mt-1">
                <div className="col-9">
                  <p className="">{user.status}</p>
                </div>

                <FaPen className="mt-1 mr-2" />
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default ProfileOffCanvas
