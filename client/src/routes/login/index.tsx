import { h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import GetAxios from '../../axios';
import {v4 as uuid} from "uuid";
import QRCode from 'react-qr-code';

async function login(username: string, password: string) {
  try {
    type resp = {
      data: {
        ok: boolean,
        result: {
          id: string
          username: string
        }
      }
    }

    const res: resp = await GetAxios().post("/login", {username, password})
    localStorage.setItem('user', JSON.stringify(res.data.result))
    route('/me', true)
    
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

const myUUID = uuid()

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const ws = new WebSocket("ws://localhost:8000/ws")
  ws.onopen = () => {
    console.log('ws connection opened');
    ws.send(`login:uuid|${myUUID}`)
  }

  ws.onclose = () => {
    console.log('connection closed');
  }

  ws.onmessage = (e) => {
    if (e.data) {
      const [cmd, data] = e.data.split(":")
      switch (cmd) {
        case "login": {
          const [id, username] = data.split("|")
          localStorage.setItem('user', JSON.stringify({id, username}))
          route('/me', true)
          break;
        }
         
      }
    }
    console.log('data', e.data);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    login(username, password).then((err) => {
      setLoginError(err)
    })
  }

  const onChange = (e) => {
    switch (e.target.name ) {
        case 'username':
            setUsername(e.target.value)
            break;
        case 'password':
            setPassword(e.target.value)
            break;
    }
}

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>Username: </label>
        <input
          type={"text"}
          name="username"
          value={username}
          onChange={onChange}
        />
      </div>
      <div>
      <label>Password: </label>
        <input
          type={"text"}
          name="password"
          value={password}
          onChange={onChange}
        />
      </div>
      <div>
        {loginError && (<div style={{color: 'red'}}>{loginError}</div>)}
      </div>
      <div>
        <button type={"submit"} onClick={onSubmit}>Login</button>
      </div>
      <br />
      <div>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={myUUID}
          viewBox={`0 0 256 256`}
        />

        <br />
        <br />

        <label>{myUUID}</label>
      </div>
    </div>
  )
}

export default Login