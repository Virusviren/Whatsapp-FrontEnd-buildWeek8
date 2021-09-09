import React, { useState, useRef } from "react"
import Button from "react-bootstrap/Button"
import Offcanvas from "react-bootstrap/Offcanvas"
import Image from "react-bootstrap/Image"
import "./AddGroupOffCanvas.css"
import { FaPen } from "react-icons/fa"
import { AiFillCamera } from "react-icons/ai"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { Form } from "react-bootstrap"
import {
  newGroup,
  selectAddGroupCanvasState,
  toggleAddGroupCanvas,
} from "../../redux/slices/conversationsSlice"

const AddGroupOffCanvas = () => {
  const isCanvasOpen = useAppSelector(selectAddGroupCanvasState)
  const dispatch = useAppDispatch()

  const fileRef = useRef<HTMLInputElement>(null)

  const [groupName, setGroupName] = useState("")
  const [groupBio, setGroupBio] = useState("")

  const uploadImage = () => {
    fileRef.current?.click()
  }

  return (
    <>
      <Offcanvas
        show={isCanvasOpen}
        onHide={() => dispatch(toggleAddGroupCanvas())}
        className="off-canvas-body">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add New Group</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="text-center common">
              <Image
                className="profile-img profile-img-hover"
                src={"bye"}
                roundedCircle
              />

              <input
                type="file"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                style={{ display: "none" }}
                id="imageClick"
                ref={fileRef}
              />
              <AiFillCamera
                className="edit-img-top middle-over-lay"
                size="2em"
                onClick={uploadImage}
              />
            </div>
          </div>

          <div className="col">
            <Form>
              <div className="row">
                <p className="user-name mt-3">Group Name</p>
                <div className="col d-flex justify-content-between mt-1">
                  <Form.Control
                    type="text"
                    placeholder="Hi"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                  <FaPen className="mt-1 mr-2" />
                </div>
              </div>
              <div className="col">
                <p className="user-name mt-3">Description</p>
                <div className="col d-flex text-break justify-content-between mt-1">
                  <Form.Control
                    type="text"
                    placeholder="Bye"
                    value={groupBio}
                    onChange={(e) => setGroupBio(e.target.value)}
                  />
                  <FaPen className="mt-1 mr-2" />
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-end mt-5">
                <FaRegArrowAltCircleRight
                  size="4em"
                  color="green"
                  onClick={() => {
                    dispatch(newGroup({ title: groupName, description: groupBio }))
                    setGroupBio("")
                    setGroupName("")
                    dispatch(toggleAddGroupCanvas())
                  }}
                />
              </div>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default AddGroupOffCanvas
