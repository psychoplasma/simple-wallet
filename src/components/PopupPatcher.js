import React from 'react';
import { ShowPopup } from '../utils/popup';

const PopupPatcher = WrappedComponent => {
    return class extends React.Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    showMessageBox={ShowPopup}
                />
            );
        }
    }
}

export default PopupPatcher;
