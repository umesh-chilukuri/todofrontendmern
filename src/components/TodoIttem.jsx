import React from 'react'

const TodoIttem = ({
    title,
    description,
    isCompleted,
    updatehandler,
    deletehandler,
    id}) => {
  return (
    <div className='todo'>

    <div>
        <h4> {title}  </h4>
        <p>{description}</p>
    </div>
    <div>
        <input onChange={()=>updatehandler(id)} type="checkbox" checked={isCompleted}></input>
        <button onClick={()=>deletehandler(id)}className='btn'>Delete</button>
    </div>
    </div>
  )
}

export default TodoIttem