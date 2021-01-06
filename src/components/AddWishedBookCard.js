import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card, Image, Button } from 'semantic-ui-react'
import { addWishBook, showBook } from '../actions/index'

export class AddWishedBookCard extends Component {

    handleAddWishedBook = (book) => {
        const newWishedBook = {
            user_id: this.props.auth.id,
            book_id: book.id
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newWishedBook)
        }

        fetch('http://localhost:3000/api/v1/user_wish_books', reqObj)
        .then(resp => resp.json())
        .then(newWishBook => {
            this.props.addWishBook(book, this.props.auth, newWishBook.id)
        })
    }

    handleAddBook = (e) => {
        e.preventDefault()

        const newBook = {
            title: this.props.title,
            author: this.props.author[0],
            image: this.props.image,
            published_date: this.props.published,
            description: this.props.description
        }

        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newBook)
        }

        fetch('http://localhost:3000/api/v1/books', reqObj)
            .then(resp => resp.json())
            .then(newWishBook => {
                this.handleAddWishedBook(newWishBook)
            })
    }

    handleViewBook = () => {
        this.props.showBook(this.props.match[0], this.props.match[1])
    }

    render() {
        return (
            <Card color='blue'>
                {this.props.match ?
                    <Image as={ Link } exact to={`/books/${this.props.match[0].id}`} onClick={this.handleViewBook} src={this.props.image} wrapped ui={false} width='300px' height='300px'/>
                    :
                    <Image src={this.props.image} wrapped ui={false} width='300px' height='300px'/>
                }
                <Card.Content>
                    <Card.Header>{this.props.title}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Published in {this.props.published ? this.props.published : '???'}</span>
                    </Card.Meta>
                    <Card.Description>
                        By: {this.props.author ? this.props.author[0] : 'unknown'}
                    </Card.Description>
                </Card.Content>
                {this.props.match ?
                <Card.Content extra>
                    <Button as={ Link } exact to={`/books/${this.props.match[0].id}`} fluid color='green' onClick={this.handleViewBook}>View Book</Button>
                </Card.Content>
                :
                <Card.Content extra>
                    <Button fluid color='blue' onClick={this.handleAddBook}>Add Book To Wish List</Button>
                </Card.Content>
                }

            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { addWishBook, showBook })(AddWishedBookCard)
