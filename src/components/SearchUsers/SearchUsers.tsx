import { useState, useEffect } from "react"
import { ListGroup } from "react-bootstrap"
import backend from "../../backend/backend"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import {
  addInvitedPeopleToDict,
  newPrivateGroup,
} from "../../redux/slices/conversationsSlice"
import { selectUserData } from "../../redux/slices/userSlice"
import { IUser } from "../../typings/users"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./SearchUsers.css"

const SearchUsers = ({
  query,
  setQuery,
}: {
  query: string
  setQuery: (query: string) => void
}) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([])
  const dispatch = useAppDispatch()
  const me = useAppSelector(selectUserData)

  useEffect(() => {
    const fetchAllUsers = async () => {
      const { data } = await backend.get("/users")
      setAllUsers(data)
    }
    fetchAllUsers()
  }, [])
  return (
    <div className={`SearchUsers w-100 mt-1 ${!query && "d-none"}`}>
      <ListGroup className="w-100">
        {allUsers
          .filter(
            (u) =>
              u.name.includes(query) ||
              u.email.includes(query) ||
              u.surname.includes(query)
          )
          .map((u) => (
            <ListGroup.Item
              className="p-0"
              key={u._id}
              onClick={() => {
                setQuery("")
                dispatch(addInvitedPeopleToDict({ [u._id]: u }))
                dispatch(newPrivateGroup({ user: u._id, me: me }))
              }}>
              <ConversationItem
                title={u.name}
                subtitle={u.status}
                avatar={u.avatar}
                id={u._id}
                disableDefault
              />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}
export default SearchUsers
