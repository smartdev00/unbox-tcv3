import {
  useTheme,
  Actionsheet,
  Box,
  Button,
  Center,
  Checkbox,
  ChevronDownIcon,
  ChevronUpIcon,
  Circle,
  Divider,
  HStack,
  Pressable,
  Radio,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { SvgUri } from "react-native-svg";
import * as Location from "expo-location";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import VoucherTicket from "./VoucherTicket";
import * as ThemedSVGs from "../../Components/ThemedSVGs";
import { RefreshControl } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useLazyQuery, gql } from "@apollo/client";
import * as queries from "../../graphql/queries";
import { AppConfig } from "../../config";

const SortbyType = {
  SORT_CLOSEST: "distance",
  SORT_NEWEST: "-id",
  SORT_AZ: "name",
  SORT_ZA: "-name",
};

const LIMIT = 10;

const FilterSheet = ({
  show,
  onQueryChanged,
  onClose,
  categories,
  locations,
}) => {
  const { colors } = useTheme();
  const [sortBy, setSortBy] = useState("name");
  const [filter, setFilter] = useState();
  const [query, setQuery] = useState({});
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [filterChanged, setFilterChanged] = useState();
  
  const [showPriceSection, setShowPriceSection] = useState(false);
  const [showCategorySection, setShowCategorySection] = useState(false);
  const [showLocationSection, setShowLocationSection] = useState(false);

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [location, setLocation] = useState();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);

  useEffect(() => {
    console.log("sort by, cat, loc changed");

    let query = {
      order: sortBy,
      limit: LIMIT,
      filters: [],
    };

    if (sortBy === SortbyType.SORT_CLOSEST) {
      query = {
        ...query,
        location: {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      };
    }

    if (showPriceSection) {
      query.filters.push(
        {
          field: "priceTotalInc",
          operator: "GT",
          value: minPrice.toString(),
        },
        {
          field: "priceTotalInc",
          operator: "LT",
          value: maxPrice.toString(),
        },
      )
    }

    if (categoryFilter.length) {
      query.filters.push({
        field: "category",
        value: categoryFilter.join(","),
      });
    }

    if (locationFilter.length) {
      query.filters.push({
        field: "category",
        value: locationFilter.join(","),
      });
    }

    setQuery(query);
  }, [sortBy, filterChanged]);

  const getLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('location perms', status);    
    setHasLocationPermission(status === "granted");
  };

  const getLocation = async () => {
    const location = await Location.getLastKnownPositionAsync();
    setLocation(location);
  }

  useEffect(() => {
    if (hasLocationPermission)
      getLocation()
  }, [hasLocationPermission])

  useEffect(() => {
    getLocationPermissions()
  }, [])

  const handleCategorySelect = (selectedCategory) => {
    console.log("handling category filter");
    const { selected, category } = selectedCategory;

    let newCategoryFilter = categoryFilter;

    if (selected) {
      newCategoryFilter.push(category);
    } else {
      const index = newCategoryFilter.indexOf(category);
      if (index > -1) {
        newCategoryFilter.splice(index, 1);
      }
    }
    console.log("setting category filter");
    setCategoryFilter(newCategoryFilter);
    setFilterChanged(new Date());
    console.log(categoryFilter.length);
  };

  const handleLocationSelect = (selectedLocation) => {
    const { selected, location } = selectedLocation;

    let newLocationFilter = locationFilter;

    if (selected) {
      newLocationFilter.push(location);
    } else {
      const index = newLocationFilter.indexOf(location);
      if (index > -1) {
        newLocationFilter.splice(index, 1);
      }
    }
    setLocationFilter(newLocationFilter);
    setFilterChanged(new Date());
  };

  const handleQueryChanged = () => {
    onQueryChanged(query);
  };

  return (
    <Actionsheet isOpen={show} onClose={onClose}>
      <Actionsheet.Content>
        <ScrollView w={"100%"}>
          <VStack alignItems={"flex-start"} p={3}>
            <Box>
              <Text fontWeight={700} fontSize={"18px"} color={"primary.600"}>
                Sort by
              </Text>
              <Radio.Group
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              >
                {(hasLocationPermission && location) &&
                <Radio value={SortbyType.SORT_CLOSEST} my={1}>
                  Closest 
                </Radio>
                }
                <Radio value={SortbyType.SORT_NEWEST} my={1}>
                  Newest
                </Radio>
                <Radio value={SortbyType.SORT_AZ} my={1}>
                  A-Z
                </Radio>
                <Radio value={SortbyType.SORT_ZA} my={1}>
                  Z-A
                </Radio>
              </Radio.Group>
            </Box>
            <Divider my={2} />
            <Box>
              <Text fontWeight={700} fontSize={"18px"} color={"primary.600"}>
                Filter by
              </Text>
            </Box>
            <Divider my={2} />
            {/* <Box>
              <Text fontWeight={700} fontSize={"16px"} color={"primary.400"}>
                My Favourites
              </Text>
            </Box>
            <Divider my={2} /> */}
            <Box>
            <Pressable
              w={"100%"}
                onPress={() => setShowPriceSection(!showPriceSection)}
                mb={(showPriceSection) ? 2 : 0}
              >
                <HStack justifyContent={"space-between"} w={"100%"}>
                  <Text
                    fontWeight={700}
                    fontSize={"16px"}
                    color={"primary.400"}
                  >
                    Price
                  </Text>
                  {showPriceSection ? (
                    <ChevronUpIcon color={"primary.400"} />
                  ) : (
                    <ChevronDownIcon color={"primary.400"} />
                  )}
                </HStack>
              </Pressable>

              {showPriceSection && (
                <>
                  <VStack w={"100%"}>
                    <HStack px={3} my={1} w={"100%"} justifyContent={"space-evenly"} space={5}>
                      <VStack
                        pb={2}
                        justifyContent={"flex-start"}
                        w={"50%"}
                        borderBottomColor={"primary.600"}
                        borderBottomWidth={1}
                      >
                        <Text color={"primary.600"} fontWeight={700}>
                          Min
                        </Text>
                        <Text color={"primary.400"}>{minPrice}</Text>
                      </VStack>
                      <VStack
                        w={"50%"}
                        borderBottomColor={"primary.600"}
                        borderBottomWidth={1}
                      >
                        <Text color={"primary.600"} fontWeight={700}>
                          Max
                        </Text>
                        <Text color={"primary.400"}>{maxPrice}</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                  <Box w={"100%"}>
                    <MultiSlider
                      sliderLength={330}
                      isMarkersSeparated={true}
                      min={0}
                      max={1000}
                      onValuesChange={(v) => {
                        setMinPrice(v[0]);
                        setMaxPrice(v[1]);
                      }}
                      values={[minPrice, maxPrice]}
                      selectedStyle={Object({
                        backgroundColor: colors.primary["400"],
                      })}
                      trackStyle={Object({
                        backgroundColor: "#c4c4c4",
                      })}
                    />
                  </Box>
                </>
              )}
            </Box>
            <Divider my={2} />
            <Box>
              <Pressable
              w={"100%"}
                onPress={() => setShowCategorySection(!showCategorySection)}
                mb={(showCategorySection) ? 2 : 0}
              >
                <HStack justifyContent={"space-between"} w={"100%"}>
                  <Text
                    fontWeight={700}
                    fontSize={"16px"}
                    color={"primary.400"}
                  >
                    Category
                  </Text>
                  {showCategorySection ? (
                    <ChevronUpIcon color={"primary.400"} />
                  ) : (
                    <ChevronDownIcon color={"primary.400"} />
                  )}
                </HStack>
              </Pressable>
              {categories &&
                showCategorySection &&
                categories.map((category, key) => (
                  <HStack
                    justifyContent={"space-between"}
                    w={"100%"}
                    my={1}
                    key={key}
                  >
                    <Text>{category.name}</Text>
                    <Checkbox
                      aria-label={category.name}
                      onChange={(e) =>
                        handleCategorySelect({
                          selected: e,
                          category: category.code,
                        })
                      }
                    />
                  </HStack>
                ))}
            </Box>
            <Divider my={2} />
            <Box>
            <Pressable
              w={"100%"}
                onPress={() => setShowLocationSection(!showLocationSection)}
                mb={(showLocationSection) ? 2 : 0}
              >
                <HStack justifyContent={"space-between"} w={"100%"}>
                  <Text
                    fontWeight={700}
                    fontSize={"16px"}
                    color={"primary.400"}
                  >
                    Location
                  </Text>
                  {showLocationSection ? (
                    <ChevronUpIcon color={"primary.400"} />
                  ) : (
                    <ChevronDownIcon color={"primary.400"} />
                  )}
                </HStack>
              </Pressable>

              {locations &&
                showLocationSection &&
                locations.map((location, key) => (
                  <HStack
                    justifyContent={"space-between"}
                    w={"100%"}
                    my={1}
                    key={key}
                  >
                    <Text>{location.name}</Text>
                    <Checkbox
                      aria-label={location.name}
                      onChange={(e) =>
                        handleLocationSelect({
                          selected: e,
                          location: location.code,
                        })
                      }
                    />
                  </HStack>
                ))}
            </Box>

            <Button mt={5} w={"100%"} onPress={handleQueryChanged}>
              Show Results
            </Button>
          </VStack>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

const VouchersTab = () => {  
  const [vouchers, setVouchers] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [queryVariables, setQueryVariables] = useState({
    limit: LIMIT,
    // queryVariables,
  });
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [offset, setOffset] = useState(0);  
  const [total, setTotal] = useState(0);

  const [listVouchersQuery] = useLazyQuery(gql(queries.vouchersListDetailed), {
    fetchPolicy: "no-cache",
  });

  const loadVouchers = async () => {
    try {
      setVouchers([]);
      const { data, error } = await listVouchersQuery({
        variables: queryVariables,
      });
      setRefreshing(true);
      if (error) {
        console.log("listVouchersQuery", error);
        // throw GraphQLException(error);
      }

      if (data) {
        console.log(JSON.stringify(data, null, 2));
        setCategories(data.categoryCategories.items);
        setLocations(data.locationCategories.items);
        setVouchers(data.vouchersListDetailed.items.map(v => {
          return {
            ...v,
            visitingAddress: v.retailer?.visitingAddress,
            price: v.price,
          }
        }))
        setTotal(data.vouchersListDetailed.total);
      }
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadVouchers();
  }, [queryVariables]);

  useEffect(() => {
    setQueryVariables((q) => {
      return {
        ...q,
        offset,
      }
    })
  }, [offset])

  return (
    <>    
      <SearchBar
        filterSheetShowing={showFilterSheet}
        onShowFilterChanged={() => setShowFilterSheet(!showFilterSheet)}
        onSearch={(s) => {
          setQueryVariables((q) => {
            return {
              ...q,
              search: s,
            };
          });
        }}
      />
      <FilterSheet
        show={showFilterSheet}
        onQueryChanged={(q) => {
          setQueryVariables(q)
          setShowFilterSheet(false)
        }}

        categories={categories}
        locations={locations}
        onClose={() => setShowFilterSheet(false)}
    />
      <ScrollView
        px={15}
        showsVerticalScrollIndicator={false}
        bgColor="white"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadVouchers} />
        }
      >
      <Box bgColor={"white"} py={3}>
        <Text fontWeight={"bold"} >
          Popular Categories
        </Text>
      </Box>
      <Box>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          m={0}
          p={0}
          bgColor={"white"}
        >
          
          <HStack space={1}>
            {categories &&
              categories
                .filter((c) => c.imageUri)
                .map((category, key) => (
                  <Pressable key={key}>
                      
                      <VStack w={20} alignItems={"center"}>
                    <Circle bgColor={"#f3f3f3"} size={"69px"}>
                        <SvgUri alt={category.name} height={40} width={40} uri={AppConfig.rootUri + category.imageUri}/>
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
        <HStack alignItems="center" alignSelf="center" flexWrap={"wrap"} mt={6}>
          {vouchers &&
            vouchers.map((voucher, key) => (
              <Box
                w={"50%"}
                key={voucher.id}
                pl={key % 2 === 0 ? 0 : 1}
                pr={key % 2 === 0 ? 1 : 0}
                mb={3}
              >
                <VoucherTicket
                  setVouchers={setVouchers}
                  voucher={voucher}
                  buyMode={true}
                />
              </Box>
            ))}
        </HStack>

        {vouchers && 
        <Box>
          <HStack
            mb={5}
            space={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              isDisabled={offset === 0}
              onPress={() => setOffset(offset - LIMIT)}
            >
              Previous
            </Button>
            <Button
              isDisabled={offset > total - LIMIT}
              onPress={() => setOffset(offset + LIMIT)}
            >
              Next
            </Button>
          </HStack>
        </Box>
        }
      </ScrollView>
    </>
  );
};

export default VouchersTab;
