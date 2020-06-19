import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const BookItemWrapper = styled.section`
    background: white;
    border: 1px solid #ddd;
    padding: 8px;
    margin-bottom: 8px;
    display: flex;

    h2{
        small{
            font-weight: normal;
            font-size: 14px;
            padding-left: 8px;
        }
    }

`;

const BookItemImageWrapper = styled.div`
    max-width: 400px;
    
    img {
        max-width: 400px;
    }
`;

const BookItemContentWrapper = styled.div`
    flex-grow: 1;
    padding-left: 10px;
`;

const BookItem = ({authorName, bookTitle, bookCover, bookSummary, children}) => {
    return (
        <BookItemWrapper>
            <BookItemImageWrapper>
                <Img fixed={bookCover}/>
            </BookItemImageWrapper>
            <BookItemContentWrapper>
                <h2>
                    {bookTitle}<small>{authorName}</small>
                </h2>
                <p>
                    {bookSummary}
                </p>
                <div>
                    {children}
                </div>
            </BookItemContentWrapper>
        </BookItemWrapper>
    )
}

export default BookItem;