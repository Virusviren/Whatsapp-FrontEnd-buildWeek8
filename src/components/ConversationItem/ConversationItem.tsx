import { useAppDispatch } from "../../redux/app/hooks"
import { fetchHistory, setActive } from "../../redux/slices/conversationsSlice"
import Avatar from "../Avatar/Avatar"
import "./ConversationItem.css"

interface ConversationItemProps {
  avatar: string
  title: string
  subtitle: string
  id: string
  disableDefault?: boolean
}

const ConversationItem = ({
  avatar,
  title,
  subtitle,
  id,
  disableDefault = false,
}: ConversationItemProps) => {
  const dispatch = useAppDispatch()
  return (
    <div
      className="ConversationItem d-flex align-items-center"
      onClick={() => {
        if (!disableDefault) {
          dispatch(setActive(id))
          dispatch(fetchHistory(id))
        }
      }}>
      <Avatar url={avatar} />
      <div>
        <h6>{title}</h6>
        <p className="text-muted">{subtitle}</p>
      </div>
    </div>
  )
}

export default ConversationItem
