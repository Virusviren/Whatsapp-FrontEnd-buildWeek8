import { useAppDispatch } from "../../redux/app/hooks"
import { setActive } from "../../redux/slices/conversationsSlice"
import Avatar from "../Avatar/Avatar"
import "./ConversationItem.css"

interface ConversationItemProps {
  avatar: string
  title: string
  subtitle: string
  id: string
}

const ConversationItem = ({ avatar, title, subtitle, id }: ConversationItemProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className="ConversationItem d-flex align-items-center" onClick={() => dispatch(setActive(id))}>
      <Avatar url={avatar} />
      <div>
        <h6>{title}</h6>
        <p className="text-muted">{subtitle}</p>
      </div>
    </div>
  )
}

export default ConversationItem
