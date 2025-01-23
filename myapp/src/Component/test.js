import React from 'react'
const arr = [1, 2, 3, 4, 5, 6, 7]
function Test() {
  return (
    <div>
     <ul>
        {arr.map(val=>{
            return <li  key={val} >{val}</li>
        })}
     </ul>
      <h1>Cheeta</h1>
    </div>
  )
}

export default Test
