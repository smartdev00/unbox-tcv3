// export const registerUser = /* GraphQL */ `
//   mutation RegisterUser($input: RegisterUserInput!) {
//     registerUser(input: $input) {
//       givenName
//       familyName
//     }
//   }
// `;

export const registerUser = /* GraphQL */ `
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      givenName
      familyName
    }
  }
`;

export const updateUserPassword = /* GraphQL */ `
  mutation UpdateUserPassword($input: InputUser!, $password: String) {
    userUpdate(input: $input, password: $password) {
      id
    }
  }
`;

export const buyVoucher = /* GraphQL */ `
  mutation buyVoucher($productId: Int!) {
    orderCreate(productId: $productId, quantity: 1) {
      id
      dateCreated
      orderLines {
        items {
          id
          quantity
          productItem {
            id
            name
            description
            priceTotalInc
            currency
            assetDetailUrl(width: 256, height: 256, fit: "cover")
            retailer {
              id
              company
              visitingAddress
              location {
                longitude
                latitude
              }
            }
          }
        }
      }
    }
  }
`;

export const submitLitter = /* GraphQL */ `
  mutation submitLitter($input: InputLitter!) {
    litterCreate(profile: "consumer-litter", input: $input) {
      id
      barcode
      dateAdded
      location {
        latitude
        longitude
      }
      geofenceCsv
      autoRecognised
      imageUrl
      imageUri
      productType
      status
      rewardValue
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: InputUser!) {
    userUpdate(input: $input) {
      id
      givenName: firstName
      familyName: lastName
      email
      username
      company
      userType: hierarchy1
      merchantType: hierarchy2
      phoneNumber: hierarchy3
      contactNumber: hierarchy4
      website: hierarchy5
    }
  }
`;

export const deleteAccount = /* GraphQL */ `
  mutation DeleteMe {
    userUpdate(input: { status: "deleted" }) {
      username
      email
      status
    }
  }
`;


export const joinCommunity = /* GraphQL */ `
  mutation JoinCommunity($id: Int!, $pin: String) {
    communityJoin(id: $id, pin: $pin) {
        communities
    }
  }
`;

export const leaveCommunity = /* GraphQL */ `
  mutation LeaveCommunity($id: Int!) {
    communityLeave(id: $id) {
        communities
    }
  }
`;

export const claimBadge = /* GraphQL */ `
  mutation ClaimBadge($id: Int!) {
    badgeClaim(id: $id) {
      id
      badges{
        won
        claimed
      }
    }
  }
`;

export const createPlog = /* GraphQL */ `
  mutation CreatePlog($route: String!, $score: Int!) {
    plogCreate(input: { route: $route, score: $score }) {      
      score
      distance
      litter {
        dateAdded
        productType
      }
      credits {
        dateAdded
        amount
      }
      badges {
        name
      }
      segments
    }
  }
`;


export const updateVoucherFavorite = /* GraphQL */ `
  mutation UpdateVoucherFavorite($id: Int!) {
    productItemFavorite(id: $id)
  } 
`;

export const redeemVoucher = /* GraphQL */ `
  mutation redeemVoucher($code: String!) {
    qrVoucherRedeem (profile:"vb", code: $code) {
      id
      code
      status
      retailer {
        company
      }
      product {
        name
      }
    }
  }
`;

export const setAppPushId = /* GraphQL */ `
  mutation SetAppPushId($input: InputUser!) {
    userUpdate(input: $input) {
      id
    }
  }
`;

export const readPushNotification = /* GraphQL */ `
  mutation readPushNotifications($id: Int!) {
    pushNotificationRead (id: $id) {
      dateAdded
      dateSent
      status
      subject
      body
      image
    }
  }
`;

export const partnerSubmit = /* GraphQL */ `
  mutation partnerSubmit($profile: String!, $partner: String!, $password: String!, $value: String!) {
    partnerSubmit (profile: $profile, partner: $partner, password: $password, value:$value) {
      success
      response
      transaction {
        id
        amount
        reason
        referrer
        reference
        type
      }
    }
  }
`;


export const setLocale = /* GraphQL */ `
  mutation setLocale($locale: String!) {
    userUpdate(input:{
      locale: $locale
    }) {
      username
      locale
    }
  }
`;
