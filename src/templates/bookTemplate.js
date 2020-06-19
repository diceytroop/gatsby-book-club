import React, { useContext } from 'react';
import Layout from '../components/layout'
import BookItem from '../components/BookItem';
import { BookComments } from '../components/Common/BookComments';
import { FirebaseContext } from '../components/Firebase';
import { graphql } from 'gatsby';

const BookTemplate = (props) => {
    const { firebase } = useContext(FirebaseContext);
    return (
        <section>
            <BookItem 
                bookTitle={props.data.book.title}
                authorName={props.data.book.author.name}
                bookSummary={props.data.book.summary}
                bookCover={props.data.book.localImage.childImageSharp.fixed}
            >
            </BookItem>
            
            {!!firebase &&
                <BookComments bookId={props.data.book.id} firebase={firebase}/>
            }
            
            
        </section>
    )
};

export const query = graphql`
    query BookQuery($bookId: String!) {
        book(id: {eq: $bookId}){
            title
            author {
                name
            }
            id
            summary
            localImage {
                childImageSharp {
                    fixed(width: 400) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    }
`;

export default BookTemplate;