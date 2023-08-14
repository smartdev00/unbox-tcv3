import {
  Box,
  Circle,
  HStack,
  ScrollView,
  Text,
  VStack,
  FlatList,
  Pressable,
} from "native-base";
import { ActivityIndicator } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { SvgUri } from "react-native-svg";
import { useState } from "react";
import VoucherTicket from "./VoucherTicket";
import { RefreshControl } from "react-native";
import { useTranslation } from "react-i18next";
import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import { AppConfig } from "../../config";

const SortbyType = {
  SORT_CLOSEST: "distance",
  SORT_NEWEST: "-id",
  SORT_AZ: "retailerCompany",
  SORT_ZA: "-retailerCompany",
};

const LIMIT = 10;

const VouchersList = ({
  queryVariables,
  setQueryVariables,
  setCats,
  setLocs,
  setSelCats
}) => {
  const { t } = useTranslation()
  const [vouchers, setVouchers] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locations, setLocations] = useState([]);
  const [total, setTotal] = useState(0);
  const [isEndReached, setIsEndReached] = useState(true);

  const [listVouchersQuery] = useLazyQuery(gql(queries.vouchersListDetailed), {
    fetchPolicy: "no-cache",
  });

  const loadVouchers = async (offset) => {
    try {
      console.log(offset, 'offset');
      const { data, error } = await listVouchersQuery({
        variables: {
          ...queryVariables,
          offset,
        }
      });
      console.log({...queryVariables, offset,}, 'queryVariables');
      if (error) {
        console.log("listVouchersQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        setCategories(data.categoryCategories.items);
        setCats(data.categoryCategories.items);
        setLocs(data.locationCategories.items);
        setLocations(data.locationCategories.items);
        console.log(data.vouchersListDetailed.items, "items");
        const items = data.vouchersListDetailed.items.map(v => {
          return {
            ...v,
            visitingAddress: v.retailer?.visitingAddress,
            price: v.price,
          }
        });
        setVouchers(items);
        setTotal(data.vouchersListDetailed.total);
        return {
          total: data.vouchersListDetailed.total,
          offset,
          items,
        };
      }
    } catch {
      return null;
    }
  };

  const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(['vouchers-items', queryVariables], ({ pageParam = 0 }) => loadVouchers(pageParam, queryVariables), {
      getNextPageParam: lastPage => {
        if (lastPage && (lastPage.total > lastPage.offset + LIMIT)) {
          return lastPage.offset + LIMIT;
        } else {
          return undefined;
        }
      }
    });

  const itemExtractorKey = (item, index) => {
    return index.toString();
  };

  const popularCategoryPressed = (selectedCategory) => {
    let newCategoryFilter = [...categoryFilter];

    if (!newCategoryFilter.includes(selectedCategory)) {
      newCategoryFilter.push(selectedCategory);
    } else {
      const index = newCategoryFilter.indexOf(selectedCategory);
      if (index > -1) {
        newCategoryFilter.splice(index, 1);
      }
    }
    setCategoryFilter(newCategoryFilter);
    setSelCats(newCategoryFilter);

    let query = {
      order: "name",
      limit: LIMIT,
      filters: [],
    };

    if (newCategoryFilter.length) {
      query.filters.push({
        field: "categoryCsv",
        operator: "CSV",
        value: newCategoryFilter.map(categoryItem => categoryItem).join(',')
      });
    }
    setQueryVariables(query);
    console.log(query);
  };

  const renderHeader = () => (
    <>
      <Box bgColor={"white"} py={3}>
        <Text fontWeight={"bold"} >
          {t('vouchers:popularCategories')}
        </Text>
      </Box>
      <Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          mb={3}
          p={0}
          bgColor={"white"}
        >

          <HStack space={1}>
            {categories &&
              categories
                .filter((c) => c.imageUri)
                .map((category, key) => (
                  <Pressable key={key}
                    onPress={() => { popularCategoryPressed(category.code) }}>

                    <VStack w={20} alignItems={"center"}>
                      <Circle bgColor={categoryFilter.includes(category.code) ? "primary.600" : "#f3f3f3"} size={"69px"}>
                        <SvgUri alt={category.name} height={40} width={40} 
                        uri={AppConfig.rootUri + (categoryFilter.includes(category.code) ? category.imageUri.replace(".svg", "-white.svg") : category.imageUri)} />
                      </Circle>
                      <Text
                        textAlign={"center"}
                        mt={1}
                        fontSize={"12px"}
                      >
                        {category.name}
                      </Text>
                    </VStack>
                  </Pressable>
                ))}
          </HStack>
        </ScrollView>
      </Box>

      <Text lineHight={21} fontWeight={"bold"} py={3}>
        Offers and vouchers
      </Text>

      {data?.pages[0].items.length === 0 &&
        <Text lineHight={21} py={3} mx={"auto"}>
          No Results Found
        </Text>
      }
    </>
  )

  const renderFooter = () => (
    <>
      <ActivityIndicator isDisabled={!hasNextPage} size="large" mb={4} />
    </>
  )

  const handleEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const VoucherCard = ({ voucher }) => (
    <>
      {voucher &&
        <Box
          w={"50%"}
          key={voucher.id}
          pl={vouchers.findIndex((el) => el.id === voucher.id) % 2 === 0 ? 0 : 1}
          pr={vouchers.findIndex((el) => el.id === voucher.id) % 2 === 0 ? 1 : 0}
          mb={3}
        >
          <VoucherTicket
            setVouchers={setVouchers}
            voucher={voucher}
            buyMode={true}
          />
        </Box>
      }
    </>
  )

  if (isLoading) {
    return <ActivityIndicator isDisabled={!hasNextPage} size="large" mb={4} />;
  }

  return (
    <>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        px={15}
        keyExtractor={itemExtractorKey}
        numColumns={2}
        horizontal={false}
        data={data ? data?.pages.flatMap(page => page.items) : []}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={isFetchingNextPage ? renderFooter : null}
        renderItem={({ item }) => (<VoucherCard voucher={item} />)}
        onEndReachedThreshold={0.2}
        onEndReached={handleEndReached}
        showsVerticalScrollIndicator={false}
        bgColor="white"
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => { }} />}
      />
    </>
  );
};

export default VouchersList;
