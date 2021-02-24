import React, { Component } from 'react';
import { connect } from 'react-redux';
import { markMessagesSeen } from '../../actions/index';
import NavBar from '../NavBar';
import MessageItem from './MessageItem';
import Footer from '../Footer';
import { Grid, Header, Icon, Button, Loader } from 'semantic-ui-react';

export class Messages extends Component {

    state = {
        users: []
    };

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            });
        });
    };

    componentWillUnmount() {
        this.props.markMessagesSeen()
        this.markMessagesSeen(this.props.messages)
    };

    markMessagesSeen = (messages) => {
        messages.filter(m => 
            m.seen === false
        ).map(m => {
            return this.markMessageSeen(m); 
        });
    };

    markMessageSeen = (msg) => {
        const updatedMessage = {
            seen: true
        };
        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(updatedMessage)
        };
        fetch(`http://localhost:3000/api/v1/messages/${msg.id}`, reqObj)
        .then(resp => resp.json())
    };

    myMessagesGrouped = () => {
        return Object.entries(this.props.messages.reduce((rv, i) => {
            (rv[i['res_book']] = rv[i['res_book']] || []).push(i);
            return rv;
        }, {})).sort((a, b) => 
            `${
                b[1][b[1].length - 1]['created_at'].slice(0,4) + 
                b[1][b[1].length - 1]['created_at'].slice(5,7) + 
                b[1][b[1].length - 1]['created_at'].slice(8,10) + 
                b[1][b[1].length - 1]['created_at'].slice(11,13) + 
                b[1][b[1].length - 1]['created_at'].slice(14,16) +
                b[1][b[1].length - 1]['created_at'].slice(17,19)
            }` - 
            `${
                a[1][a[1].length - 1]['created_at'].slice(0,4) + 
                a[1][a[1].length - 1]['created_at'].slice(5,7) + 
                a[1][a[1].length - 1]['created_at'].slice(8,10) + 
                a[1][a[1].length - 1]['created_at'].slice(11,13) + 
                a[1][a[1].length - 1]['created_at'].slice(14,16) +
                a[1][a[1].length - 1]['created_at'].slice(17,19)
            }`
        );
    };

    messageUser = (i) => {
        return this.state.users.find(u => u.id === i)
    }

    render() {
        window.scrollTo(0, 0);
        if (!this.props.auth || !this.state.users || !this.props.messages) {
            return (
                <Grid style={{ height: '99vh' }}>
                    <Loader active />
                </Grid>
            );
        } else {
            return (
                <div className='App'>
                    <NavBar/><br/>
                    <Grid style={{ minHeight: '99vh' }}>
                        <Grid.Row></Grid.Row>
                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column width='7'></Grid.Column>
                            <Grid.Column width='2'>
                                <Header as='h2' icon style={{color: 'white'}} textAlign="center">
                                    <Icon name='mail' circular />
                                    <Header.Content>
                                        Your Messages
                                    </Header.Content>
                                </Header>
                            </Grid.Column>
                            <Grid.Column width='7' textAlign='center'>
                                <Button icon='mail' content='new' color='blue'/>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width='2'></Grid.Column>
                            <Grid.Column width='12'>
                                {this.myMessagesGrouped().map((m, i) => {
                                    const userId = m[1][0].user_id === this.props.auth.id ? m[1][0].recipient_id : m[1][0].user_id
                                    return <MessageItem 
                                        key={i} 
                                        messageItem={m[1]} 
                                        resBookId={m[0]}
                                        authId={this.props.auth.id} 
                                        user={this.messageUser(userId)}
                                    />
                                })}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid><br/>
                    <Footer/>
                </div>
            );
        };  
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        messages: state.allMessages
    };
};

export default connect(mapStateToProps, { markMessagesSeen })(Messages);
