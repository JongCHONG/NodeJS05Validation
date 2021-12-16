import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  if (!users) {
    return <h1>Chargement...</h1>
  }

  console.log(users)
  return (
    <div>
      <Link to="/formuser">New user</Link>
      {users.map(element => {
        return (
          <p key={element.name}>
            <Link to={`/users/${element.slug}`}>
              {element.name}
            </Link>
          </p>
        )
      })}
    </div>
  )
}

export default Home