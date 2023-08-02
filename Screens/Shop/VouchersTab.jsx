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
import { QueryClient, QueryClientProvider } from "react-query";
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
import VouchersList from "./VouchersList";

const SortbyType = {
  SORT_CLOSEST: "distance",
  SORT_NEWEST: "-id",
  SORT_AZ: "retailerCompany",
  SORT_ZA: "-retailerCompany",
};

const LIMIT = 10;

const queryClient = new QueryClient();

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
      categoryFilter.forEach((categoryItem) => {
        query.filters.push({
          field: "categoryCsv",
          operator: "CSV",
          value: categoryItem,
        });
      });
    }

    if (locationFilter.length) {
      locationFilter.forEach((locationItem) => {
        query.filters.push({
          field: "categoryCsv",
          operator: "CSV",
          value: locationItem,
        });
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
                        setFilterChanged(new Date());
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
      <QueryClientProvider client={queryClient}>
        <VouchersList
          queryVariables={queryVariables}
          setQueryVariables={setQueryVariables}
          setCats={setCategories}
          setLocs={setLocations} />
      </QueryClientProvider>
    </>
  );
};

export default VouchersTab;
