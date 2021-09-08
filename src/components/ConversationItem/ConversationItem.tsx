import Avatar from "../Avatar/Avatar"
import "./ConversationItem.css"

interface ConversationItemProps {
  avatar: string
  title: string
  subtitle: string
}

const ConversationItem = ({ avatar, title, subtitle }: ConversationItemProps) => {
  return (
    <div className="ConversationItem d-flex align-items-center">
      <Avatar url={avatar} />
      <div>
        <h6>{title}</h6>
        <p className="text-muted">{subtitle}</p>
      </div>
    </div>
  )
}

export default ConversationItem
