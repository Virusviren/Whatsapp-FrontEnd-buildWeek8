import moment from "moment"
import "./Message.css"

interface MessageProps {
  message: string
  date: Date
  position: string
  sender?: string
}

const Message = ({ message, date, position, sender }: MessageProps) => {
  return (
    <div className={`Message ${position}`}>
      {sender && <p>{sender}</p>}
      <p>{message}</p>
      <p className="text-end date">{moment(date).fromNow()}</p>
    </div>
  )
}

export default Message
