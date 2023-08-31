import React from 'react'
import './styles.scss'
import Reply from '../Icon/reply'
import Delete from '../Icon/delete'
import Edit from '../Icon/edit'

interface IProps {
  comment?:any
  message?: string
  username?: string
  createdAt?: any


}
// const dateFormatter = new Intl.DateTimeFormat(undefined, {dateStyle: 'medium', timeStyle: 'short'})

const Comments: React.FC<IProps> = (props) => {
  return (
    <div className='comment'>

      <div className='header'>
        <span className='name'>{props.username}</span>
        <span className='date'>{props.createdAt}</span>
      </div>

      <div className='commentContent'>{props.message}</div>

      <div className='footer'>
        <div><Edit/></div>
        <div><Delete/></div>
        <div><Reply/></div>
      </div>
    </div>
  )
}

export default Comments

