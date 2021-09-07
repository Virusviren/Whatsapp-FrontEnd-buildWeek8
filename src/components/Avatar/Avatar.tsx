import "./Avatar.css"

interface AvatarProps {
  url: string
}

const Avatar = ({ url }: AvatarProps) => {
  return (
    <div className="Avatar">
      <img src={url} alt="avatar" />
    </div>
  )
}

export default Avatar
