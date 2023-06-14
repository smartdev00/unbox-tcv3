import React, { useEffect, useState, } from 'react';

import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../graphql/queries";

import { useTranslation, } from "react-i18next";

import {
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {
  Box,
  Button,
  Circle,
  Input,
  ScrollView,
  Switch,
  Text,
} from 'native-base';

import {
  Filter,
} from '../assets/svg';

import { TopBar } from "../Components";

import { GraphQLException, } from '../exceptions';


const Product = ({ product, }) => {

  const { t } = useTranslation();


  return (
    <Box width={"100%"} borderRadius={17} bgColor={"white"} p={3} my={3}>
      {(product.active) &&
        <Circle size={3} bgColor={"green.400"} position={"absolute"} right={0} m={3} />
      }
      <Text
        textTransform={"uppercase"}
      >
        {product.merchant.name}
      </Text>
      <Text>{product.description}</Text>

      <Box flexDirection={"row-reverse"} justifyContent={"space-between"} Content={"flex-start"} alignItems={"flex-end"} width={"100%"}>
        <Button
          bgColor={"primary.500"}
        >

          {(product.active) ? (
            <Text
              color={"white"}
              fontWeight={700}
              textTransform={"uppercase"}
            >{t('screens.market.product.seeCode')}</Text>
          ) : (
            <Text
              color={"white"}
              fontWeight={700}
              textTransform={"uppercase"}
            >
              {product.price} {t('general.coinSuffix')}
            </Text>
          )}

        </Button>

        {(product.expiry) &&
          <Text>{t('screens.market.product.expiry', { expiry: new Date(product.expiry).toLocaleDateString() })}</Text>
        }

      </Box>
    </Box>
  )
}

const Products = ({ products, showActive, }) => {
  const productList = products.filter(product => !product.active || (showActive === product.active)).map((product, key) => (
    <Product product={product} key={key} />
  ))

  return productList;
}

const Market = ({ navigation }) => {

  const { t } = useTranslation();

  const [showFilter, setShowFilter] = useState(false);
  const [showActive, setShowActive] = useState(true);

  const [products, setProducts] = useState();
  const [merchants, setMerchants] = useState();

  const [merchantsQuery] = useLazyQuery(gql(queries.merchantsList), {
    fetchPolicy: "no-cache",
  });

  const [productsQuery] = useLazyQuery(gql(queries.products), {
    fetchPolicy: "no-cache",
  });

  const loadMerchants = async () => {
    const { data, error } = await merchantsQuery();

    if (error) console.log(error)
    // throw GraphQLException(error);

    setMerchants(data.merchants);
  }

  const loadProducts = async () => {
    const { data, error } = await productsQuery ();

    if (error) console.log(error)
    //throw GraphQLException(error);

    setProducts(data.products.items);
  }

  useEffect(() => {
    // loadMerchants();
    loadProducts();
  }, []);

  if (!products) return null;    

  return (
    <>
      {(showFilter) &&
        <Box bgColor="white" position={"absolute"} left={0} top={0} width={"66%"} height={"100%"} zIndex={2}
          borderTopRightRadius={"19px"}
          borderBottomRightRadius={"19px"}
          shadow={8}
          p={5}
        >
          <Text
          >
            {t('screens.market.filter.title')}
          </Text>
          <Text
            fontSize={14}
            fontWeight={700}
            mt={3}
          >
            {t('screens.market.filter.price')}
          </Text>
          <Text
            fontSize={14}
            fontWeight={700}
            mt={3}
          >
            {t('screens.market.filter.merchant')}
          </Text>
          {(merchants && merchants.map((merchant, key) => (
            <Text key={key}>{merchant.name}</Text>
          )))}
          <Text
            fontSize={14}
            fontWeight={700}
            mt={3}
          >
            {t('screens.market.filter.distance')}
          </Text>
          <Text
            fontSize={14}
            fontWeight={700}
            mt={3}
          >
            {t('screens.market.filter.type')}
          </Text>

          <Button
            bgColor={"primary.500"}
            _text={Object({
              textTransform: "uppercase"
            })}
            onPress={() => setShowFilter(false)}
          >{t('buttons.apply')}</Button>
        </Box>
      }
      <TouchableWithoutFeedback onPress={() => setShowFilter(false)} >
        <Box p={3} flex={1} bg={"primary.100"} alignItems={"center"}>
          <TopBar navigation={navigation} balanceHighlight={true} />
          <Box width="100%" pt={5}>
            <Input borderRadius={16}>
            </Input>
          </Box>
          <Box mt={5} justifyContent={"space-between"} flexDirection={"row"} width="100%" alignItems={"center"}>
            <Filter onPress={() => setShowFilter(true)} />
            <Box flexDirection={"row"} alignItems={"center"}>
              <Text
                fontWeight={700}
              >
                Active
              </Text>
              <Switch
                isChecked={showActive}
                size="sm"
                onTrackColor={"primary.500"}
                onValueChange={(value) => setShowActive(value)}
              />
            </Box>
          </Box>
          <ScrollView mt={2} width="100%" flex={1}>
            <View onStartShouldSetResponder={() => !showFilter}>
              {(products) &&
                <Products products={products} showActive={showActive} />
              }
            </View>
          </ScrollView>
        </Box>
      </TouchableWithoutFeedback>
    </>
  )
}

export default Market;