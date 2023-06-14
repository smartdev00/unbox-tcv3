import React, { useEffect, useState, } from 'react';

import { useTranslation, } from "react-i18next";

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";


import {
  Box,
  Text,
} from 'native-base';

const Section = ({ section, }) => {
  return (
    <Box w={"100%"} my={3}>
      <Text fontWeight={700}>{section.title}</Text>
      <Text mt={2}>{section.text}</Text>
    </Box>
  )
}

const AboutTab = ({ user, }) => {

  const { t } = useTranslation();

  const [about, setAbout] = useState();

  const [aboutQuery] = useLazyQuery(gql(queries.about), {
    fetchPolicy: "no-cache",
  });

  const loadAbout = async () => {
    const { data, error } = await aboutQuery ();

    if (error)
      console.log(error)
      //  throw GraphQLException(error);

    setAbout(data.about);
  }

  useEffect(() => {
    loadAbout();
  }, []);

  if (!about) return null;  


  return (
    <Box flex={1} p={5} alignItems={"center"} bgColor="white">
      {about.map((section, key) => (
        <Section section={section} key={key} />
      ))}
    </Box>
  )
}

export default AboutTab;