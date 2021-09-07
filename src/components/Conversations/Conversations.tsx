import { BiMessageRoundedAdd } from "react-icons/bi"
import Avatar from "../Avatar/Avatar"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./Conversations.css"

const Conversations = () => {
  return (
    <div className="Conversations">
      <div className="d-flex align-items-center justify-content-between topbar">
        <Avatar url={process.env.REACT_APP_MOCK_AVATAR!} />
        <BiMessageRoundedAdd size={30} />
      </div>
      <div>
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
        <ConversationItem title="Group name" avatar={process.env.REACT_APP_MOCK_GROUP_AVATAR!} subtitle="last message" />
      </div>
    </div>
  )
}

export default Conversations
