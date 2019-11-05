import React from 'react'

class AddFishForm extends React.Component {

    name = React.createRef();
    price = React.createRef();
    status = React.createRef();
    desc = React.createRef();
    image = React.createRef();

    fishForm = React.createRef();

    createFish = event => {
        event.preventDefault();
        console.log('Gonna make some fish!')
        const fish = {
            name: this.name.current.value,
            price: this.price.current.value,
            status: this.status.current.value,
            desc: this.desc.current.value,
            image: this.image.current.value,
        }
        this.props.addFish(fish);
        this.fishForm.current.reset();
    }

    render() {
        return (
            <form ref={this.fishForm} className="fish-edit" onSubmit={this.createFish}>
                <input ref={this.name} type="text" placeholder="Fish Name"/>
                <input ref={this.price} type="text" placeholder="Fish Price"/>
                <select ref={this.status}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={this.desc} placeholder="Fish Desc"/>
                <input ref={this.image} type="text" placeholder="Fish Image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
}

export default AddFishForm;
