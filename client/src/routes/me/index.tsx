import { h } from 'preact';
import { route } from "preact-router";
import {QrScanner} from '@yudiel/react-qr-scanner';
import { useState } from 'preact/hooks';
import GetAxios from '../../axios';

async function login(uuid: string, userID: string) {
  try {
    await GetAxios().post("/login/uuid", {uuid, userID})
  } catch (error) {
    type resp = {
      data: {
        ok: boolean,
        error: string
      }
    }

    const res: resp = error.response
    return res.data.error
  }
}

const Me = () => {
  const user: {id: string, username: string} = JSON.parse(localStorage.getItem('user'))
  if (!user || !user.id || !user.username) route("/login/uuid", true)

  const [uuid, setUUID] = useState('')
  const [loginError, setLoginError] = useState('')

  const detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const onSubmit = (e) => {
    e.preventDefault()

    login(uuid, user.id).then((err) => {
      setLoginError(err)
      return
    })
  }

  const onChange = (e) => {
    switch (e.target.name ) {
      case 'uuid':
        setUUID(e.target.value)
        break;
      }
  }
  
  return (
    <div>
      <label>ID: {user.id}</label>
      <br />
      <br />
      <label>Username: {user.username}</label>
      
      {
        detectMobile() &&  
        <QrScanner
          onDecode={(result) => {
            setUUID(result)
            login(uuid, user.id)
          }}
          onError={(error) => console.log(error?.message)}
        />
      }
      {
        !detectMobile() && (
          <div>
            <br />
            <br />
            <label>UUID For Login: </label>
            <input 
              type={"text"}
              name="uuid"
              value={uuid}
              onChange={onChange}
            />
            <button type={"submit"} onClick={onSubmit}>Login</button>
          </div>
        )
      }
      {loginError && (<div style={{color: 'red'}}>{loginError}</div>)}
    </div>
  )
}

export default Me