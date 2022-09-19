

// Design Components
import { message } from 'antd';


const showMessage = (success, error, warning) => {
    if (success !== null) {
        message.success({
            content: success,
            className: 'display-message',
        });
    } else if (error !== null) {
        message.error({
            content: error,
            className: 'display-message',
        });
    } else if (warning !== null) {
        message.warning({
            content: warning,
            className: 'display-message',
       });
    }
}

export {
    showMessage
}