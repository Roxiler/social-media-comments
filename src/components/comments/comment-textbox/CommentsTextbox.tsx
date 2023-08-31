import React, {useState} from 'react'
import './styles.scss'

 interface IProps{
  value?:any

}

const CommentsTextbox:React.FC<IProps> = (props) => {
  return (
    <div className='textBox'>
      <input placeholder='Add Comment' className='commentInput' value={props.value} />
      <button className='button'>Post</button>
    </div>
  )
}

export default CommentsTextbox

