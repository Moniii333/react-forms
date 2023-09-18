import { useState } from "react"

export default function Authenticate({ passedToken, userNameData }) {
  const [successMessage, setSuccessMessage] = useState(null)
  const [error, setError] = useState(null)

  async function handleClick() {
    setError(null)
    setSuccessMessage(null)
    try{
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${passedToken}`,
        },
      })
      const result = await response.json()
      console.log('Authentication fetch results ', result)
      if(response.ok) {
      setSuccessMessage(result.message)
      } else {
        setError(result.message)
      }
  } catch(error) {
      setError(error.message)
    }
}

const randomGenerator = () => {
  return Math.floor(Math.random() * 36) + 1
}
const hours = randomGenerator()

  return(
    <>
  <h1>Authenticate</h1>
    <div className="authenticated">
      {successMessage && <><p className="auth-success"> Welcome Back<span className="username"> {userNameData}</span>, You Are {successMessage}</p>
        <section className="last-login">{hours} hours since your last login..</section></>
      }
      {error && <p className="auth-error"> You're not allow in! {error}</p>}
    </div>
    <button onClick={handleClick}>Authenticate Token!</button>
    </>
  )
}