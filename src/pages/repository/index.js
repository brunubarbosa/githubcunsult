import React from 'react'

function Repository({ match }) {
  return (
    <h1>repository {decodeURIComponent(match.params.repository)}</h1>
  )
}

export default Repository;
