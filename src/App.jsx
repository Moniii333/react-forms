import SignUpForm from './components/SignUpForm'
import Authenticate from './components/Authenticate'
import { useState } from 'react'
import './App.css'

function App() {
  const [token, setToken] = useState(null)
  const [userName, setUserName] = useState('')

  return (
    <div>
      {token ? (
        <Authenticate passedToken={token} userNameData={userName} />
      ) : (
        <SignUpForm onSignupSuccess={(newToken, newUser) => {
          setToken(newToken)
          setUserName(newUser)
        }}  />
      )}
    </div>
  )
}

export default App
