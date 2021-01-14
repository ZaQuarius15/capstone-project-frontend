import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import PublicUserCard from './PublicUserCard'
import { Grid, Loader, Header, Card, Icon } from 'semantic-ui-react'

export class UsersDashboard extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => {
            this.setState({
                users
            })
        })
    }

    fellowMyBrarians = () => {
        return this.state.users.filter(u => u.id !== this.props.auth.id)
    }

    render() {
        const currentlyReading = this.props.allLibraryBooks
        return (
            <div className='App'>
                <NavBar/>
                <br/><br/><Header as='h2' icon style={{color: 'white'}} textAlign='center'>
                    <Icon name='user' circular />
                    <Header.Content>MyBrarians</Header.Content>
                </Header><br/><br/>
                <Grid textAlign='center'>
                    <Grid.Column width='1'></Grid.Column>
                    {this.props.auth ? 
                        <Card.Group itemsPerRow={3} centered inverted>
                            {this.fellowMyBrarians().map(u => <PublicUserCard user={u}/>)}
                        </Card.Group>
                        :
                        <Grid style={{ height: '99vh' }} verticalAlign='middle'><Loader size='massive' active/></Grid>
                    }   
                </Grid><br/><br/><br/><br/>
                <div className="ui inverted vertical footer segment form-page">
                    <div className="ui container">
                        MyBrary
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        allLibraryBooks: state.allLibraryBooks,
        auth: state.auth
    }
}

export default connect(mapStateToProps, null)(UsersDashboard)
