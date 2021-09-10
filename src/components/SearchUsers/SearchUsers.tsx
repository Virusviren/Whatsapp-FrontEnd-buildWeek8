import { useState, useEffect } from "react"
import { ListGroup } from "react-bootstrap"
import backend from "../../backend/backend"
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks"
import { addInvitedPeopleToDict, invitePeople, newGroup, selectActiveConversationId } from "../../redux/slices/conversationsSlice"
import { selectUserData } from "../../redux/slices/userSlice"
import { IUser } from "../../typings/users"
import ConversationItem from "../ConversationItem/ConversationItem"
import "./SearchUsers.css"

const SearchUsers = ({ query, setQuery }: { query: string; setQuery: (query: string) => void }) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([])
  const me = useAppSelector(selectUserData)
  const activeGroupId = useAppSelector(selectActiveConversationId)
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
          .filter(u => u.name.includes(query) || u.email.includes(query) || u.surname.includes(query))
          .map(u => (
            <ListGroup.Item
              className="p-0"
              key={u._id}
              onClick={async () => {
                setQuery("")
                await dispatch(newGroup({ user: u._id }))
                const usersObject = {
                  [u._id]: u,
                  [me._id]: me,
                }
                dispatch(addInvitedPeopleToDict(usersObject))
                dispatch(invitePeople({ users: usersObject, groupId: activeGroupId, myId: me._id }))
              }}
            >
              <ConversationItem title={u.name} subtitle={u.status} avatar={u.avatar} id={u._id} disableDefault />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}
export default SearchUsers
