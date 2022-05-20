const Button = ({color,text, onToggleForm}) => {
  return (
    <button 
    className='btn' 
    style={{backgroundColor: color}}
    onClick={onToggleForm}
    >{text}</button>
  )
}

Button.defaultProps = {
    color: 'blue',
}

export default Button
