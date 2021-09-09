import ProfileOffCanvas from "../ProfileOffCanvas/ProfileOffCanvas"
import AddGroupOffCanvas from "../AddGroupOffCanvas/AddGroupOffCanvas"

import { Form, FormControl } from "react-bootstrap"
import { MdMessage } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  selectConversationsData,
  toggleAddGroupCanvas,
} from "../../redux/slices/conversationsSlice"
import Avatar from "../Avatar/Avatar"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./Conversations.css"
import { selectUserData } from "../../redux/slices/userSlice"
import InviteOffCanvas from "../InviteOffCanvas/InviteOffCanvas"

const Conversations = () => {
  const conversationsStore = useAppSelector(selectConversationsData)
  const user = useAppSelector(selectUserData)
  const dispatch = useAppDispatch()
  return (
    <div className="Conversations">
      <div className="d-flex flex-column align-items-center topbar">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 border-bottom border-secondary">
          <Avatar url={user.avatar!} profile={true} />
          <ProfileOffCanvas />
          <AddGroupOffCanvas />
          <InviteOffCanvas />
          <MdMessage size={28} onClick={() => dispatch(toggleAddGroupCanvas())} />
        </div>
        <Form className="d-flex pt-2 w-100">
          <FormControl
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="rounded-pill"
            size="sm"
          />
        </Form>
      </div>
      <div>
        {conversationsStore.map((conversation) => (
          <ConversationItem
            key={conversation._id}
            id={conversation._id}
            title={conversation.title}
            avatar={conversation.avatar}
            subtitle={
              conversation.messageHistory.length === 0
                ? "No messages yet"
                : conversation.messageHistory[conversation.messageHistory.length - 1]
                    .content!
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Conversations
