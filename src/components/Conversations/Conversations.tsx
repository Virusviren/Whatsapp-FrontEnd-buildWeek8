import ProfileOffCanvas from "../ProfileOffCanvas/ProfileOffCanvas"
import AddGroupOffCanvas from "../AddGroupOffCanvas/AddGroupOffCanvas"

import { Form, FormControl } from "react-bootstrap"
import { MdMessage } from "react-icons/md"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  selectActiveConversation,
  selectActiveConversationId,
  selectConversationsData,
  selectUsers,
  toggleAddGroupCanvas,
} from "../../redux/slices/conversationsSlice"
import Avatar from "../Avatar/Avatar"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./Conversations.css"
import { selectUserData } from "../../redux/slices/userSlice"
import InviteOffCanvas from "../InviteOffCanvas/InviteOffCanvas"
import SearchUsers from "../SearchUsers/SearchUsers"
import { useState } from "react"

const Conversations = () => {
  const conversationsStore = useAppSelector(selectConversationsData)
  const user = useAppSelector(selectUserData)
  const allUsers = useAppSelector(selectUsers)
  const activeConversation = useAppSelector(selectActiveConversation)
  const dispatch = useAppDispatch()

  const [query, setQuery] = useState("")

  return (
    <div className="Conversations">
      <div className="d-flex flex-column align-items-center topbar">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 border-bottom border-secondary">
          <Avatar url={user.avatar!} profile={true} />
          <ProfileOffCanvas />
          <AddGroupOffCanvas />
          {activeConversation?.groupType === "PUBLIC" && <InviteOffCanvas />}
          <MdMessage size={28} onClick={() => dispatch(toggleAddGroupCanvas())} />
        </div>
        <div className="position-relative w-100">
          <Form className="d-flex pt-2 w-100">
            <FormControl
              type="search"
              placeholder="Search"
              className="rounded-pill"
              size="sm"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </Form>
          <SearchUsers query={query} setQuery={setQuery} />
        </div>
      </div>
      <div>
        {conversationsStore.map(conversation => (
          <ConversationItem
            key={conversation._id}
            id={conversation._id}
            title={
              conversation.groupType === "PUBLIC"
                ? conversation.title
                : allUsers[(conversation.users.find(u => u._id !== user._id) as any)._id].name
            }
            avatar={
              conversation.groupType === "PUBLIC"
                ? conversation.avatar
                : allUsers[(conversation.users.find(u => u._id !== user._id) as any)._id].avatar
            }
            subtitle={
              conversation.messageHistory.length === 0
                ? "No messages yet"
                : conversation.messageHistory[conversation.messageHistory.length - 1].content!
            }
          />
        ))}
      </div>
    </div>
  )
}

export default Conversations
