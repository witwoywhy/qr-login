import { h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import GetAxios from '../../axios';

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

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

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
    </div>
  )
}

export default Login