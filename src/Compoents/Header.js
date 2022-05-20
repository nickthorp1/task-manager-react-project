import Button from "./Button"

const Header = ({title, onToggleForm, showAdd}) => {
  return (
    <header className='header'>
        <h1>{title}</h1> 
        <Button 
        color={showAdd ? 'red' : 'green'}
        text={showAdd ? 'Close' : 'Add'} 
        onToggleForm={onToggleForm}/>
    
        
        
       
    </header>
  )
}

Header.defaultProps = {
    title: "title goes here",
}

export default Header
