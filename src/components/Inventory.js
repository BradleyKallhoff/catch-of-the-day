import React from 'react'
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';
import Login from './Login';

class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object.isRequired,
        loadSamples: PropTypes.func.isRequired,
        addFish: PropTypes.func.isRequired,
        updateFish: PropTypes.func.isRequired,
        removeFish: PropTypes.func.isRequired,
        storeId: PropTypes.string.isRequired,
    }

    state = {
        uid: null,
        owner: null,
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }

    authenticate = provider => {
        console.log(`Trying to log in with ${provider}`);
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }

    authHandler = async authData => {
        // 1. Look up the current store in the firebase database
        const store = await base.fetch(this.props.storeId, { context: this });
        console.log(store);
        // 2. Claim it if there is no owner
        if (!store.owner) {
            // save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
    }

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }

    renderInventory = key => {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)}/>
                <input type="text" name="price" value={fish.price} placeholder="Fish Price" onChange={(e) => this.handleChange(e, key)}/>
                <select name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        );
    }

    handleChange = (e, key) => {
        const fish = this.props.fishes[key];
        // take a copy of that fish and update it with the new data
        const updatedFish = {
            ...fish,
            [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    }

    render() {

        const logout = <button onClick={this.logout}>Log Out!</button>

        // Check if they are not logged in
        if(!this.state.uid) {
            return <Login authenticate={this.authenticate} />
        }

        // Check if they are the owner of the store
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry, you aren't the owner of this store!</p>
                    {logout}
                </div>
            );
        }

        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;
