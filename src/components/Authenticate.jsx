import { useState } from "react"

export default function Authenticate({ passedToken }) {
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
  
  return(
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p className="auth-success"> Welcome!! {successMessage}</p>}
      {error && <p className="auth-error"> You're not allow in! {error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  )
}