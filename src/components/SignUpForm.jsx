import { useState } from "react"

export default function SignUpForm({ onSignupSuccess }) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleForm = async(e) => {
    e.preventDefault()
    try{
    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      })
  })
    const result = await response.json()
    
    console.log('Sign up fetch results...', result)
    setUserName(userName)
    onSignupSuccess(result.token, userName)
    } catch(error) {
      setError(error.message)
    }
  }

  return(
    <div>
      <h2>Sign Up</h2>
      {error && <p>Uh oh! {error}</p>}
      <form id="sign-up-form"  onSubmit={handleForm}>
        <label id="username" > Username: {' '}
          <input name="username" placeholder="Username" autoComplete= 'userName' minLength={8} required value={userName} onChange={(e) => setUserName(e.target.value)}/>
        </label>
        <br></br>
        <label id="password"> Password: {' '}
          <input name="password" placeholder="Password" type="password" required minLength={8} value={password} onChange={(x) => setPassword(x.target.value)}/>
        </label>
        <br></br>
        <input type="submit" value={'Submit'}></input>
      </form>
    </div>
  )
}