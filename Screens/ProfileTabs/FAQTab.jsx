import React, { useEffect, useState, } from 'react';

import { useLazyQuery, gql } from "@apollo/client";

import { useTranslation, } from "react-i18next";

import * as queries from "../../graphql/queries";

import {
  Box,
  Icon,
  Pressable,
  Text,
} from 'native-base';

import { FontAwesome } from '@expo/vector-icons';


const FAQItem = ({ faq, }) => {

  const [expanded, setExpanded] = useState(false)

  return (
    <Box w={"100%"}>
    <Pressable onPress={() => setExpanded(!expanded)} >
      <Box bgColor={(expanded) ? "gray.50" : "white"} justifyContent={"space-between"} flexDirection={"row"} p={5}>
        <Box>
          <Text
            fontWeight={700}

          >
            {faq.title}
          </Text>
          {(expanded) &&
            <Text mt={2}>{faq.text}</Text>
          }
        </Box>
        <Icon color={"black"} as={FontAwesome} name={(expanded) ? "chevron-up" : "chevron-down"} />
      </Box>
    </Pressable>
    </Box>

  )
}

const FAQTab = () => {

  const [faqs, setFaqs] = useState();

  const [faqsQuery] = useLazyQuery(gql(queries.faqs), {
    fetchPolicy: "no-cache",
  });

  const loadFaqs = async () => {
    const { data, error } = await faqsQuery ();

    if (error)
      console.log(error) 
    // throw GraphQLException(error);

    setFaqs(data.faqs);
  }

  useEffect(() => {
    loadFaqs();
  }, []);

  if (!faqs) return null;

  return (
    <Box flex={1} mt={5} alignItems={"center"} bgColor="white">
      {faqs.map((faq, key) => (
        <FAQItem faq={faq} key={key} />
      ))}
    </Box>
  )
}

export default FAQTab;