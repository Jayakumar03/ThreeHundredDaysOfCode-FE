// Elements.
import { Button, Input} from 'antd';

// Styles.
import '../styles/CodeSubmitForm.css';

function CodeSubmitForm(props) {
    function handleClick() {
        const val = document.getElementById('code-submit-form-input').value;
        console.log(val);
        props.handleClick(val);
    }

    return (
    <div className='code-submit-form-container'>        
        <Input className='code-submit-form-input' id='code-submit-form-input' placeholder="Github Link"/>
        <Button className='code-submit-form-submit-button' onClick={handleClick}> Submit </Button> 
    </div>
    );
}

export default CodeSubmitForm;