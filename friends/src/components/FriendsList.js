import React from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { AddFriendForm } from './AddFriendForm'

class FriendsList extends React.Component {
    state = {
        friends: []
    };

    componentDidMount() {
        console.log("Friends componentDidMount 5x5");
        this.getData();
    }

    getData = () => {
        axiosWithAuth()
            .get("/friends")
            .then((res) => {
                this.setState({ friends: res.data });
                console.log('');
            })
    }

    addFriend = (friend) => {
        axiosWithAuth()
            .post("/friends", friend)
            .then(res => {
                this.setState({
                    ...this.state,
                    friends: res.data
                })
            })
            .catch(err => {
                console.log(`YO Error: `, err)
            })
    }

    render() {
        const { friends } = this.state;
        return (
            <div className="friends-container">
                {friends.map(friend => {
                    return (
                        <div key={friend.id} className="friend">
                            <p>Name: {friend.name}, {friend.age}</p>
                            <p>email: {friend.email}</p>
                        </div>
                    )
                })}
                <AddFriendForm addFriend={this.addFriend} />
            </div>
        )
    };
}
export default FriendsList;
