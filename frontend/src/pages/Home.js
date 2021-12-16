import React, { useState, useEffect } from 'react'

const Home = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
  }, [])

  console.log(users)
  return (
    <div>
      Home
    </div>
  )
}

export default Home