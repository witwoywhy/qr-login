import { h } from 'preact';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';
import GetAxios from '../../axios';

async function signup(username: string, password: string): Promise<string> {
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

        const res: resp = await GetAxios().post("/user", {username, password})
        if (res.data.ok) route('/login', true)
        
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

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [signUpError, setSignUpError] = useState('')

    const validate = () => {
        let isError = false

        if (username.length < 3) {
            isError = true
            setUsernameError('username must be at least 3 character')
        }

        if (password.length < 8) {
            isError = true
            setPasswordError('password must be at least 8 character')
        }

        return isError
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        const validateError = validate()
        if (validateError) return

        signup(username, password).then((err) => {
            setSignUpError(err)
            return
        });
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
            <h1>SignUp</h1>
            <div>
                <div>
                    <label>Username: </label>
                    <input 
                        type={"text"}
                        name="username"
                        value={username}
                        onChange={onChange}
                    />
                    {usernameError && (<div style={{color: 'red'}}>{usernameError}</div>)}
                </div>
                <div>
                    <label>Password: </label>
                    <input 
                        type={"text"}
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                    {passwordError && (<div style={{color: 'red'}}>{passwordError}</div>)}
                </div>
                <div>
                    {signUpError && (<div style={{color: 'red'}}>{signUpError}</div>)}
                </div>
                <div>
                    <button type={"submit"} onClick={onSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;