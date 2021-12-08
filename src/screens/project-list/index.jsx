import { SearchPanel } from "./SearchPanel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import * as qs from "qs";
import { cleanObject, useMount, useDebounce } from "../../utils";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // 声明变量及修改方法（固定写法）
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const useDebouncedParam = useDebounce(param, 2000)
  const [list, setList] = useState([])

  // 当param改变时获取接口
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(useDebouncedParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [useDebouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      console.log(response)
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}/>
    <List users={users} list={list}/>
  </div>
}
