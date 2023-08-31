import React from 'react'

const Reply = ({size=16}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none" width={size} height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        fillRule="evenodd"
        d="M9.707 3.293a1 1 0 0 1 0 1.414L6.414 8H12a8 8 0 0 1 8 8v4a1 1 0 1 1-2 0v-4a6 6 0 0 0-6-6H6.414l3.293 3.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default Reply

