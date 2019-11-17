import React from "react"
import { Link, graphql } from "gatsby"

const BlogPost = ({ data }) => {
  return (
    <div style={{ margin: 60 }}>
      <Link to="/blog">Go Back</Link>
      <h1 style={{ marginBottom: 0 }}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <small>
        {" "}
        Posted by {data.markdownRemark.frontmatter.author} on{" "}
        {data.markdownRemark.frontmatter.date}
      </small>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        style={{ marginTop: 30 }}
      ></div>
      <hr />
    </div>
  )
}
export const post = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        shortnote
        date
        author
      }
    }
  }
`
export default BlogPost
