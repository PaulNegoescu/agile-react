import React from 'react'

export default function Error({ message, onReloadClicked }) {
    console.warn(message);

    function handleReload(e) {
        e.preventDefault();
        onReloadClicked(e);
    }

    return (
        // <div className="alert alert-danger" role="alert">
        //     <p>Ooops! Something went wrong! Please try again later!</p>
        //     <a href="/" onClick={ handleReload }>Reload</a>
        // </div>

        <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <img src="..." className="rounded mr-2" alt="..." />
                <strong className="mr-auto">Bootstrap</strong>
                <small>11 mins ago</small>
                <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="toast-body">
                { message }
            </div>
        </div>
    );
}
