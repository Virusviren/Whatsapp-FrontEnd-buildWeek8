import { useAppDispatch } from "../../redux/app/hooks"
import { toggleCanvas } from "../../redux/slices/userSlice"
import "./Avatar.css"

interface AvatarProps {
  url: string
}

const Avatar = ({ url }: AvatarProps) => {
  const dispatch = useAppDispatch()
  return (
    <div className="Avatar" onClick={() => dispatch(toggleCanvas())}>
      <img src={url} alt="avatar" />
    </div>
  )
}

export default Avatar
