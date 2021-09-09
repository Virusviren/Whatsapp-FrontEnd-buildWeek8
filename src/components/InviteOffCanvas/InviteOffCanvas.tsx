import React, { useState, useEffect } from "react"

import Offcanvas from "react-bootstrap/Offcanvas"

import "./InviteOffCanvas.css"

import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { Button } from "react-bootstrap"
import {
  invitePeople,
  selectActiveConversation,
  selectActiveConversationId,
  selectInviteCanvasState,
  toggleInviteCanvas,
} from "../../redux/slices/conversationsSlice"
import backend from "../../backend/backend"
import { IUser } from "../../typings/users"
import Avatar from "../Avatar/Avatar"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { ISingleUser } from "../../typings/conversations"

const InviteOffCanvas = () => {
  const isCanvasOpen = useAppSelector(selectInviteCanvasState)
  const activeGroupId = useAppSelector(selectActiveConversationId)
  const activeGroup = useAppSelector(selectActiveConversation)
  const dispatch = useAppDispatch()

  const [allUsers, setAllUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await backend.get("/users")
      const inGroup = activeGroup?.users?.map((u) => (u as ISingleUser)._id)
      const usersNotInGroup = data.filter((u: ISingleUser) => !inGroup?.includes(u._id))
      setAllUsers(usersNotInGroup)
    }
    getAllUsers()
  }, [activeGroup])

  const toggleSelectedUser = (id: string) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== id))
    } else {
      setSelectedUsers([...selectedUsers, id])
    }
  }

  return (
    <>
      <Offcanvas
        placement="end"
        show={isCanvasOpen}
        onHide={() => dispatch(toggleInviteCanvas())}
        className="inviteCanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add People To Your Group</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {allUsers?.map((u: IUser) => (
            <div
              className="d-flex mb-3 inviteUserBlock"
              onClick={() => toggleSelectedUser(u._id)}>
              <Avatar url={u.avatar as string} size="52px" />
              <div className="d-flex flex-column ms-2 justify-content-around me-auto">
                <p className="m-0 fw-bold fs-6">
                  {u.name} {u.surname}
                </p>
                <p className="m-0 text-muted">{u.status}</p>
              </div>
              <div className="d-flex align-items-center me-2">
                <AiOutlineCheckCircle
                  size="2em"
                  color={selectedUsers.includes(u._id) ? "green" : "gray"}
                />
              </div>
            </div>
          ))}
          <Button
            disabled={selectedUsers.length === 0}
            onClick={() => {
              dispatch(invitePeople({ users: selectedUsers, groupId: activeGroupId }))
              dispatch(toggleInviteCanvas())
            }}>
            INVITE
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default InviteOffCanvas
