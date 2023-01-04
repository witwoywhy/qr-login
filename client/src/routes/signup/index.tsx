import { h } from 'preact';
import { useState } from 'preact/hooks';

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

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
        
        const err = validate()
        if (err) return
        
        if (!err) {
            setUsername('')
            setPassword('')
            setUsernameError('')
            setPasswordError('')
        }
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
                    <button type={"submit"} onClick={onSubmit}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp;