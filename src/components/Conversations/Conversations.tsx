import ProfileOffCanvas from "../ProfileOffCanvas/ProfileOffCanvas"
import { Form, FormControl } from "react-bootstrap"
import { MdMessage } from "react-icons/md"
import { useAppSelector } from "../../redux/app/hooks"
import { selectConversationsData } from "../../redux/slices/conversationsSlice"
import Avatar from "../Avatar/Avatar"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./Conversations.css"
import { selectUserData } from "../../redux/slices/userSlice"

const Conversations = () => {
  const conversationsStore = useAppSelector(selectConversationsData)
  const user = useAppSelector(selectUserData)
  return (
    <div className="Conversations">
      <div className="d-flex flex-column align-items-center topbar">
        <div className="d-flex justify-content-between align-items-center w-100 pb-2 border-bottom border-secondary">
          <Avatar url={user.avatar!} />
          <ProfileOffCanvas />
          <MdMessage size={28} />
        </div>
        <Form className="d-flex pt-2 w-100">
          <FormControl type="search" placeholder="Search" aria-label="Search" className="rounded-pill" size="sm" />
        </Form>
      </div>
      <div>
        {conversationsStore.map(conversation => (
          <ConversationItem
            key={conversation._id}
            id={conversation._id}
            title={conversation.title}
            avatar={conversation.avatar}
            subtitle={
              conversation.messageHistory.length === 0
                ? "No messages yet"
                : conversation.messageHistory[conversation.messageHistory.length - 1].content!
            }
          />
        ))}
        {/* <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" /> */}
      </div>
    </div>
  )
}

export default Conversations
