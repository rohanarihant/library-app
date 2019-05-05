import React from 'react';

const Loader = (props) => {
    return (
        <div className="loading-overlay hide-it" style={{ display: props.loaderFlag ? 'block' : 'none' }}>
            <div className="overlay-container">
                <div className="overlay-backdrop" />
                <div className="dialog">
                    <div>
                        <img src="/images/loading.svg" alt="loading.." height={45} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default React.memo(Loader);