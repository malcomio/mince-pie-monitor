import React from 'react';

function WithListLoading(Component) {
    return function WihLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <div className='box'>
                Hold on, fetching data may take some time :)
            </div>
        );
    };
}
export default WithListLoading;
