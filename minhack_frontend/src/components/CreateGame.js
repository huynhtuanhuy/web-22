import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';

export default class CreateGame extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // không cần bind this
    handleSubmit = (event) => {
        event.preventDefault();
        const players = this.state.players;

        const game = {
            players: players,
            scores: []
        }

        axios({
            url: 'http://10.1.9.47:6996/api/game',
            data: game,
            method: 'POST'
        }).then((data) => {
            console.log("success", data);
            this.props.showPlayGame();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    // cần bind this vào
    handleInputChange(event) {
        // const { players } = this.state;
        const players = this.state.players

        players[event.target.name] = event.target.value;
        
        this.setState({ players: players });
    }

    render() {
        console.log(this.state.players);

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input
                        name="0"
                        onChange={this.handleInputChange}
                        placeholder="Player 1..."
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="1"
                        onChange={this.handleInputChange}
                        placeholder="Player 2..."
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="2"
                        onChange={this.handleInputChange}
                        placeholder="Player 3..."
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        name="3"
                        onChange={this.handleInputChange}
                        placeholder="Player 4..."
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="submit"/>
                </FormGroup>
            </Form>
        )
    }
}
