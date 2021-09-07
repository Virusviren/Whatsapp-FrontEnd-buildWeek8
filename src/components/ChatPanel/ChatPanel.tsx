import Avatar from "../Avatar/Avatar"

import "./ChatPanel.css"

interface ChatPanelProps {
  title: string
  participants: string[]
  avatar: string
}

const ChatPanel = ({ title, participants, avatar }: ChatPanelProps) => {
  return (
    <div className="ChatPanel">
      <div className="d-flex align-items-center topbar">
        <Avatar url={avatar} />
        <div>
          <h6>{title}</h6>
          <p className="text-muted">{participants.join(", ")}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
