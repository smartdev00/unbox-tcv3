import { ScrollView } from 'native-base'
import SearchBar from './SearchBar'
import VoucherTicket from './VoucherTicket'
import { useState } from 'react'

const MyFavouritesTab = () => {
  const [vouchers, setVouchers] = useState([
    {
      id: 1,
      name: 'Five Burgers',
      discount: 'Free Cheeseburger',
      price: 44,
      favourite: true,
    },
    {
      id: 2,
      name: 'Ramen Ya!',
      discount: 'Free Cheeseburger',
      price: 22,
      favourite: true,
    },
    {
      id: 3,
      name: 'Ramen Ya!',
      discount: 'Free Cheeseburger',
      price: 17,
      favourite: false,
    },
    {
      id: 4,
      name: 'Five Burgers',
      discount: 'Free Cheeseburger',
      price: 33,
      favourite: false,
    },
    {
      id: 5,
      name: 'Five Burgers',
      discount: 'Free Cheeseburger',
      price: 26,
      favourite: true,
    },
    {
      id: 6,
      name: 'Five Burgers',
      discount: 'Free Cheeseburger',
      price: 62,
      favourite: true,
    },
  ])

  return (
    <>
      <SearchBar />
      <ScrollView mt={6} px={30} showsVerticalScrollIndicator={false} bgColor="white">
        {vouchers &&
          vouchers.filter((voucher) => voucher.favourite).map(voucher => (
            <VoucherTicket
              key={voucher.id}
              voucher={voucher}
              setVouchers={setVouchers}
            />
          ))}
      </ScrollView>
    </>
  )
}

export default MyFavouritesTab
