import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import BeerCard from "../beer-card";
import Section from "../layout/section";
import Wrapper from "../layout/wrapper";
import PropTypes from "prop-types";
import Grid from "../layout/grid";

const Center = styled.div`
  text-align: center;
`;
function CardList(props) {
  const [data, setData] = useState({ beers: [] });
  const [loading, setLoading] = useState(true);
  const [networkStatus, setNetWorkStatus] = useState("loading...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(props.url);
        setData({ beers: result.data });
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setNetWorkStatus(err.response.data.message);
        } else {
          setNetWorkStatus("Network Error");
        }
      }
    };

    fetchData();
  }, [props.url]);

  return (
    <Section>
      {loading && <Center> {networkStatus} </Center>}

      {!loading && (
        <Wrapper>
          <Grid columns={2}>
            {data.beers.map((beer, index) => (
              <BeerCard
                key={index.toString()}
                image={beer.image_url}
                title={beer.name}
                description={beer.brewers_tips}
              />
            ))}
          </Grid>
        </Wrapper>
      )}
    </Section>
  );
}

CardList.propTypes = {
  url: PropTypes.string.isRequired
};

export default CardList;
