import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { showBook, addWishBook, deleteReservedBook } from '../actions/index.js'
import  Carousel  from  'semantic-ui-carousel-react';
import { Grid, Header, Image, Button, Icon } from  'semantic-ui-react'

export class CurrentlyReadingCarousel extends Component {

    handleShowBook = (book) => {
        this.props.showBook(book, this.props.auth)
    }

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

    isWishedBook = (b) => {
        return this.props.allWishedBooks.find(book => book[0].id === b.id && book[1].id === this.props.auth.id)
    }
    
    state  = {elements: this.props.books.map(b => {
        return {render: () => {
            return (
                <Grid.Column width='2'>
                    <Header textAlign='center'><Icon name='book'/>Currently Reading</Header>
                    <Image src={b.image} alt='' fluid/><br/><br/>
                    <Button.Group widths='2'>
                    <Button as={ Link } exact to={`/books/${b.id}`} fluid animated='fade' icon='eye' color='blue' onClick={() => this.handleShowBook(b)}>
                            <Button.Content visible><Icon name='eye'/></Button.Content>
                            <Button.Content hidden>View</Button.Content>
                    </Button>
                    {this.props.pub && !this.isWishedBook(b) ?
                    <Button fluid animated='fade' icon='book' color='green' onClick={() => this.handleAddWishedBook(b)}>
                            <Button.Content visible><Icon name='book'/></Button.Content>
                            <Button.Content hidden>+WishList</Button.Content>
                    </Button>
                    : 
                    null
                    }
                    {/*  */}
                    </Button.Group>
                    {this.props.books.length !== 1 ? <br/> : null}
                </Grid.Column>
            );
          }
        }
    })}

    findElements = () => {
        return this.props.books.map(b => {
            return {render: () => {
                return (
                    <Grid.Column width='2'>
                        <Header textAlign='center'><Icon name='book'/>Currently Reading</Header>
                        <Image src={b.image} alt='' fluid/><br/><br/>
                        <Button.Group widths='2'>
                        <Button as={ Link } exact to={`/books/${b.id}`} fluid animated='fade' icon='eye' color='blue' onClick={() => this.handleShowBook(b)}>
                                <Button.Content visible><Icon name='eye'/></Button.Content>
                                <Button.Content hidden>View</Button.Content>
                        </Button>
                        {this.props.pub && !this.isWishedBook(b) ?
                        <Button fluid animated='fade' icon='book' color='green' onClick={() => this.handleAddWishedBook(b)}>
                                <Button.Content visible><Icon name='book'/></Button.Content>
                                <Button.Content hidden>+WishList</Button.Content>
                        </Button>
                        : 
                        null
                        }
                        {/*  */}
                        </Button.Group>
                        {this.props.books.length !== 1 ? <br/> : null}
                    </Grid.Column>
                );
            }
            }
        })
    }

    render() {
        console.log(this.props.books)
        return (
            <div style={{textAlign: 'center'}}>
                <Carousel
                    elements  =  {  this.findElements()  }
                    duration  ={this.props.books.length !== 1 ? 10000 : null}
                    animation  ='slide left'
                    showNextPrev  =  {false}
                    showIndicators  = {this.props.books.length !== 1 ? true : false}
                />
            </div>
        )
    
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
        allWishedBooks: state.allWishedBooks
    }
}

export default connect(mapStateToProps, { showBook, addWishBook, deleteReservedBook })(CurrentlyReadingCarousel);