import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
  const { slug } = useParams()
  const [user, setUser] = useState()

  useEffect(() => {
    fetch(`http://localhost:5000/users/${slug}`)
    .then(response => response.json())
    .then(data => setUser(data))
  }, [])

  if (!user) {
    return <h1>Chargement...</h1>
  }

  console.log(user)
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.city}</p>
      <p>{user.profile_picture}</p>
    </div>
  )
}

export default User