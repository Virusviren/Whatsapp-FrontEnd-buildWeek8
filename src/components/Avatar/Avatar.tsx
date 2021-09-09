import { useAppDispatch } from "../../redux/app/hooks"
import { toggleCanvas } from "../../redux/slices/userSlice"
import "./Avatar.css"

interface AvatarProps {
  url: string
  size?: string
  profile?: boolean
}

const Avatar = ({ url, size = "42px", profile = false }: AvatarProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className="Avatar" onClick={() => (profile ? dispatch(toggleCanvas()) : null)}>
      <img src={url} alt="avatar" width={size} height={size} />
    </div>
  )
}

export default Avatar
