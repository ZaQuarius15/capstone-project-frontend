import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showUser } from '../actions/index'
import { Card, Image, Button, Icon, Header } from 'semantic-ui-react'

export class DashboardWishedBookCard extends Component {

    handleUserView = () => {
        this.props.showUser(this.props.user)
    }

    reservedBook = () => {
        return this.props.reservedBooks.find(b => b.user_lib_book_id === this.props.match[2])
    }

    render() {
        return (
            <Card color='blue'>
                <Image as={ Link } exact='true' to={`/books/${this.props.book.id}`} src={this.props.book.image ? this.props.book.image : 'https://www.pngfind.com/pngs/m/216-2160526_jpg-royalty-free-library-3-books-clipart-book.png'} wrapped ui={false} width='300px' height='300px'/>
                <Card.Content>
                    <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.book.published_date ? this.props.book.published_date : 2020}</span>
                    </Card.Meta>
                    <Card.Description>
                        {this.props.book.author}
                    </Card.Description>
                </Card.Content>
                {this.props.match && !this.reservedBook() ? 
                    <Card.Content extra textAlign="center">
                        <Header as='h5' icon color='green' textAlign="center">
                            <Icon name='check' circular/>
                            <Header.Content>Match</Header.Content>
                        </Header>
                    </Card.Content> 
                    : 
                    null
                }
                <Card.Content extra>
                {this.props.pub ?
                        <Button as={ Link } fluid exact='true' to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue'>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    :
                    <Button.Group widths='2'>
                        <Button as={ Link } exact='true' to={`/users/${this.props.user.id}`} animated='fade' icon='user' color='green' onClick={this.handleUserView}>
                            <Button.Content visible><Icon name='user'/></Button.Content>
                            <Button.Content hidden>{this.props.user.username}</Button.Content>
                        </Button>
                        <Button as={ Link } exact='true' to={`/books/${this.props.book.id}`} animated='fade' icon='eye' color='blue'>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                        </Button>
                    </Button.Group>    
                }

                </Card.Content>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        reservedBooks: state.reservedBooks
    }
}

export default connect(mapStateToProps, { showUser })(DashboardWishedBookCard)