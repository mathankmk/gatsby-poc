import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allMarkdownRemark {
        edges {
          node {
            id
            frontmatter {
              path
              title
              shortnote
              date
              author
            }
            excerpt
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title="Blog" />
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <div style={{ marginTop: 60 }}>
          <h1>Latest Posts</h1>
          {data.allMarkdownRemark.edges.map(post => (
            <div key={post.node.id}>
              <h3 style={{ marginBottom: 15 }}>
                {post.node.frontmatter.title}
              </h3>
              <p>
                {" "}
                {post.node.frontmatter.shortnote}{" "}
                <Link to={post.node.frontmatter.path}>Read more..</Link>
              </p>
              <small>
                Posted by {post.node.frontmatter.author} on{" "}
                {post.node.frontmatter.date}
              </small>
              <br />
              <br />
              <hr />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default BlogPage
