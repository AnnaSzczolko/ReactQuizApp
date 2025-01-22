import React from 'react'

export default function ErrorMessage({title, message, onConfirm}) {
  return (
    <div className='error'>
        <h2 className='error__title'>{title}</h2>
        <p className='error__text'>{message}</p>
        {onConfirm && (
            <div>
                <button onClick={onConfirm}> Ok</button>
            </div>
        ) }
    </div>
  )
}
