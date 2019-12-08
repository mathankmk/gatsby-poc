import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

import Footer from "../components/shared/footer"
import Hero from "../components/hero"
import Section from "../components/layout/section"
import ListSection from "../components/card-list"

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;
`
const url = "https://api.punkapi.com/v2/beers?page=1&per_page=10"
const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 style={{ paddingTop: 40 }}>Card List</h1>
    <div className="App">
      <MainWrapper>
        <Hero />
        <Section>
          <ListSection url={url} />
        </Section>
        <Footer style={{ paddingTop: 40 }} />
      </MainWrapper>
    </div>
  </Layout>
)

export default IndexPage
