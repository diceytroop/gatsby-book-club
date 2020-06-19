import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import BookItem from '../components/BookItem'

const LinkButton = styled.div`
  text-align: right;

  a{
    padding: 8px;
    background: rebeccapurple;
    color: white;
    border-radius: 8px;
    text-decoration: none;

    &:hover{
      background: indigo;
    }
  }
`


const IndexPage = (props) => {
  console.log(props)
  return (
    <section>
      {props.data.allBook.edges.map(edge => (
        <BookItem 
          bookTitle={edge.node.title}
          bookSummary={edge.node.summary}
          authorName={edge.node.author.name}
          bookCover={edge.node.localImage.childImageSharp.fixed}
          key={edge.node.id}>
          <LinkButton>
            <Link to={`/book/${edge.node.id}`}>
              Join conversation
            </Link>
          </LinkButton>        </BookItem>
      ))}
    </section>
  );
}

export const query = graphql`
  {
    allBook {
      edges {
        node {
          summary
          title
          id
          localImage {
            childImageSharp {
              fixed(width: 400){
                ...GatsbyImageSharpFixed
              }
            }
          }
          author {
            name
          }
        }
      }
    }
  }
`

export default IndexPage
