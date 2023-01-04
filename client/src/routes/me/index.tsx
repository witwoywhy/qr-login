import { h } from 'preact';
import { route } from "preact-router";

const Me = () => {
  const user: {id: string, username: string} = JSON.parse(localStorage.getItem('user'))
  if (!user || !user.id || !user.username) route("/login", true)
  
  return (
    <div>
      <label>ID: {user.id}</label>
      <br />
      <br />
      <label>Username: {user.username}</label>
    </div>
  )
}

export default Me