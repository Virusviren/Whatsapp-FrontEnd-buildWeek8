import { useState, useEffect } from "react"
import { ListGroup } from "react-bootstrap"
import backend from "../../backend/backend"
import { useAppDispatch } from "../../redux/app/hooks"
import { addInvitedPeopleToDict, newGroup } from "../../redux/slices/conversationsSlice"
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
                dispatch(newGroup({ user: u._id }))
                dispatch(addInvitedPeopleToDict({ [u._id]: u }))
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
