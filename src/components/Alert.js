import React from 'react'

function Alert(props) {
    return (

        <div style={{ height: '40px' }}>
            {props.message && <div className={`alert alert-${props.alertType}`} role="alert">
                {props.message}
            </div>}
        </div>
    )
}

export default Alert
