import React, { useContext, } from 'react';

import { useTranslation, } from "react-i18next";

import {
  UserContext,
  // UserProgressContext,
  // WalletContext,
} from '../Context';

import {
  Box,
  Image,
  Pressable,
  Row, Column,
  Text,
  Avatar,
} from 'native-base';


import {
  EmptyProfileAvatar,
  Rosette,
} from "../assets/svg";



const TopBar = ({ navigation, transparent = false, medal = false, balance = false, balanceHighlight = false, }) => {

  const { t } = useTranslation();

  const [user,] = useContext(UserContext);
  // const [userProgress,] = useContext(UserProgressContext);
  // const [wallet] = useContext(WalletContext);

  return (
    <Box width="100%">
      <Row justifyContent={'space-between'}>
        <Box>
          <Row justifyContent={'center'} alignContent={"flex-start"}>
            <Pressable onPress={() => navigation.navigate("Profile")} pr={2}>
              {/* <EmptyProfileAvatar /> */}
            </Pressable>

            <Column>
              <Text
                fontSize={14}
                fontWeight={700}
              >
                {user.nickname}
              </Text>
              {/* <Text
                fontSize={14}
                fontWeight={400}
              >
                {userProgress.level}
              </Text> */}
            </Column>

          </Row>
        </Box>
        <Box alignItems={"flex-end"}>
          {(balance.value || balanceHighlight) &&
            <React.Fragment>
              <Text
                fontSize={14}
                fontWeight={700}                
              >{t('components.topbar.balance')}</Text>
              <Text
                fontSize={32}
                fontWeight={700}
                color={balanceHighlight ? 'highlight.500' : 'black'}
              >
                {wallet.balance.value} {t('general.coinSuffix')}
              </Text>
            </React.Fragment>
          }
          {(medal) &&
            <Pressable onPress={() => navigation.navigate("Achievements")}>
              {/* <Rosette /> */}
            </Pressable>
          }
        </Box>
      </Row>
    </Box>
  )
}

export default TopBar;