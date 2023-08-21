export const postLogin = /* GraphQL */ `
  query PostLogin {
    user: userGet {
      email
      firstName
      lastName
      username
      badges {
        won
        claimed
      }
      communities
      appPushId
      avatarUri
    }
    geofences: geofenceList {
      items {
        id
        pointsArray {
          longitude
          latitude
        }
      }
    }
    balance: balanceGet(currency: CUC) {
      remaining
    }
  }
`;

export const myBalance = /* GraphQL */ `
  query MyBalance {
    myBalance: balanceGet(currency: CUC) {
      remaining
    }
  }
`;

export const currentUser = /* GraphQL */ `
  query CurrentUser {
    userGet {
      email
      firstName
      lastName
      username
    }
  }
`;

export const geofences = /* GraphQL */ `
  query Geofences {
    geofences: geofenceList {
      items {
        id
        pointsArray {
          longitude
          latitude
        }
      }
    }
  }
`;

export const retailers = /* GraphQL */ `
  query Retailers {
    retailerList(order: "company") {
      items {
        id
        location {
          latitude
          longitude
        }
      }
    }
  }
`;

export const retailersCount = /* GraphQL */ `
  query RetailersCount {
    retailerList {
      count
    }
  }
`;

export const retailersDetailed = /* GraphQL */ `
  query RetailersDetailed($limit: Int, $offset: Int, $search: String) {
    retailersDetailed: retailerList(order: "company", limit: $limit, offset: $offset, search: $search) {
      items {
        id
        img: avatarUrl(width: 256, height: 256, fit: "inside")
        company
        department
        visitingAddress
        phone
        category
        location {
          longitude
          latitude
        }
      }
      total
      count
    }
  }
`;

export const retailerGet = /* GraphQL */ `
  query getRetailer($merchantId: Int!) {
    retailerGet(id: $merchantId) {
      id
      img: avatarUrl(width: 256, height: 256, fit: "inside")
      company
      visitingAddress
      category
      department
      phone
      location {
        longitude
        latitude
      }
    }
  }
`;

export const vouchersListDetailed = /* GraphQL */ `
  query VouchersDetailed($limit: Int, $offset: Int, $filters: [InputFilter], $order: String, $search: String) {
    categoryCategories: categoryList(      
      filters: [{ field: "depth", value: "2" }]
    ) {
      count
      total
      items {
        id
        name
        code
        imageUri
        depth
      }
    }
    locationCategories: categoryList(filters: [{ field: "depth", value: "1" }]) {
      count
      total
      items {
        id
        name
        code
        imageUri
        depth
      }
    }
    vouchersListDetailed: productItemList(limit: $limit, offset: $offset, filters: $filters, order: $order, search: $search) {
      items {
        img: assetDetailUrl(format: "svg")
        id
        description
        name
        price: priceTotalInc
        retailer {
          id
          name: company
          visitingAddress
          location {
            latitude
            longitude
          }
          website
        }
        terms
        isFavorite
        #expiry
      }
      total
      count      
    }
  }
`;

export const merchantVouchersListDetailed = /* GraphQL */ `
  query MerchantVouchersDetailed($merchantId: String!) {
    merchantVouchersListDetailed: productItemList(
      filter: { field: "retailerId", operator: EQ, value: $merchantId }
    ) {
      items {
        img: assetDetailUrl(height: 256, fit: "cover")
        id
        description
        name
        price: priceTotalInc
        retailer {
          id
          name: company
          visitingAddress
          location {
            latitude
            longitude
          }
          website: hierarchy5
        }
        terms
        isFavorite
        #expiry
      }
    }
  }
`;

export const myVouchersList = /* GraphQL */ `
  query {
    myVouchers: orderList {
      count
      items {
        id
        dateAdded
        orderLines {
          items {
            id
            status
            qrVoucher(profile: "vb") {
              status
            }
            productItem {
              img: assetDetailUrl(width: 256, height: 256, fit: "inside")
              id
              description
              name
              price: priceTotalInc
              retailer {
                id
                name: company
                visitingAddress
                location {
                  latitude
                  longitude
                }
                website: hierarchy5
              }
              terms
            }
          }
        }
      }
    }
  }
`;

export const myVoucherDetails = /* GraphQL */ `
  query MyVoucherDetails($orderLineId: Int!) {
    myVoucher: consumerVoucherView(orderLineId: $orderLineId, profile: "vb") {
      id
      code
      dateExpires
      pin
      status
      datePurchased
      dateRedeemed
      validDayTimes
      validFrom
      validTo
      qrCodeUri
      qrCodeUrl
      retailer {
        visitingAddress
      }
      # qrCodeContent (format:"svg")
    }
  }
`;

export const barcodeScan = /* GraphQL */ `
  query BarcodeScan($barcode: String!) {
    barcodeScan(barcode: $barcode) {
      id
      packaging
    }
  }
`;

export const consumerCreditTransactionsList = /* GraphQL */ `
  query TransactionsCreditOnly {
    transactionList(
      currency: CUC
      filter: { field: "type", value: "credit" }
      order: "-dateAdded"
    ) {
      count
      items {
        id
        type
        amount
        reason
        referrer
        reference
        dateAdded
        litter {
          productType
          status
          imageUri
        }
        badge {
          name
          images {
            won
          }
        }
      }
    }
  }
`;

export const consumerDebitTransactionsList = /* GraphQL */ `
  query TransactionsDebitOnly {
    transactionList(
      currency: CUC
      filter: { field: "type", value: "debit" }
      order: "-dateAdded"
    ) {
      count
      items {
        id
        type
        amount
        reason
        referrer
        reference
        dateAdded
        order {
          orderLines {
            items {
              productItem {
                name
                retailer {
                  company
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const partnersListDetailed = /* GraphQL */ `
  query PartnersListDetailed($profile: String!) {
    partnerList(profile: $profile) {
      items {
        identifier
        type
        contentListLabel
        contentListButton
        contentImage
        contentTitle
        contentBody
        inputRequired
        inputValidationRegex
        inputPassword
      }
    }
  }
`;

export const communitiesListDetailed = /* GraphQL */ `
  query ListCommunities {
    communityList(
      filters: [
        { field: "visibility", operator: EQ, value: "visible" }
        { field: "status", operator: EQ, value: "active" }
      ]
    ) {
      items {
        id
        name
        description
        about
        hasPin
        assetUri
        status
      }
    }
    userCommunities: userGet {
      communities
    }
  }
`;

export const getCommunity = /* GraphQL */ `
  query GetCommunity($communityId: Int!) {
    communityGet(id: $communityId) {
      id
      name
      about
      assetUri(width: 150, fit: "stretch")
      statistics {
        year
        month
        week
        daily {
          current
        }
        today
        totalClicks
        totalDistance
      }
    }
  }
`;

export const badgesListDetailed = /* GraphQL */ `
  query ListBadges {
    badgeList {
      items {
        name
        id
        reward
        descriptions {
          won
          unwon
        }
        images {
          won
          unwon
          locked
          photo
        }
      }
    }
    userBadges: userGet {
      badges {
        won
        claimed
      }
    }
  }
`;

export const getUserStatistics = /* GraphQL */ `
  query UserStatistics {
    userGet {
      statistics {
        year
        month
        week
        dayPeak
        daily {
          current
          data
        }
        monthly {
          current
          data
        }
        contribution {
          current
          data {
            key
            value
          }
        }
        today
        streak
      }
    }
  }
`;


//----------------

export const faqs = /* GraphQL */ `
  query Faqs {
    faqs {
      title
      text
    }
  }
`;

export const about = /* GraphQL */ `
  query About {
    about {
      title
      text
    }
  }
`;

export const transactions = /* GraphQL */ `
  query Transactions {
    transactions {
      items {
        id
        name
        createdAt
        amount
      }
    }
  }
`;

export const products = /* GraphQL */ `
  query Products {
    products {
      items {
        id
        name
        description
        expiry
        price
        active
        merchant {
          name
        }
      }
    }
  }
`;

export const achievements = /* GraphQL */ `
  query Achievements {
    badges {
      items {
        id
        name
        description
        status
      }
    }
  }
`;

export const merchantsList = /* GraphQL */ `
  query Merchants {
    merchants {
      id
      name
    }
  }
`;

export const pushNotificationList = /* GraphQL */ `
  query PushNotificationList($filter: InputFilter) {
    pushNotificationList(filter: $filter) {
      items {
        id
        status
        dateAdded
        dateSent
        subject
        viewOnline
        body
        image
      }
      total
      count
    }
  }
`;
