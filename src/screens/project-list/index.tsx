import { List } from './list'
import { SearchPanel } from './search-panel'
import { useEffect, useState } from 'react'
import * as qs from 'qs'
import { cleanObject, useDebounce } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  const newParam = useDebounce(param, 2000)
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(newParam))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json())
        }
      }
    )
  }, [newParam])
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  }, [])
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
