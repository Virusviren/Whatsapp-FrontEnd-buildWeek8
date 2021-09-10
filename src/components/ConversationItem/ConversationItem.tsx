import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  fetchHistory,
  selectConversationsData,
  selectUsers,
  setActive,
} from "../../redux/slices/conversationsSlice"
import { IConversation } from "../../typings/conversations"
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
  const allChats = useAppSelector(selectConversationsData)
  const dispatch = useAppDispatch()

  const [thisGroup, setThisGroup] = useState<IConversation | undefined>(undefined)

  useEffect(() => {
    setThisGroup(allChats.find((chat) => chat._id === id))
  }, [allChats])

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
        <p className="text-muted">
          {thisGroup?.typing
            ? Object.keys(thisGroup?.typing!).length > 0
              ? "someone is typing"
              : subtitle
            : subtitle}
        </p>
      </div>
    </div>
  )
}

export default ConversationItem
