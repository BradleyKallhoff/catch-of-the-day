import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    myInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        console.log('You Changed the URL')
        // First grab the text from the box
        const storeName = this.myInput.current.value;
        console.log(`Going to ${storeName}`);
        // Second we're going to transition from / to /store/:storeId
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        // Anywhere else
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                { /* Hello, this is a comment in a return */ }
                <h2>Please Enter a Store</h2>
                <input  type="text"
                        required 
                        placeholder="Store Name" 
                        defaultValue={getFunName()}
                        ref={this.myInput}
                />
                <button type="submit">Visit Store</button>
            </form>
        );
    }
}

export default StorePicker;