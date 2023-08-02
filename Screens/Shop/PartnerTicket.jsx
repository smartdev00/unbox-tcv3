import React, { useContext } from "react";

import { Box, Button, FormControl, Image, Input, Modal, Text, useTheme } from "native-base";

import { AppConfig } from "../../config";
import { Alert, Pressable, } from "react-native";
import HTML from 'react-native-render-html';
import { LocaleContext } from "../../Context";

import { gql, useMutation } from "@apollo/client";

import * as mutations from '../../graphql/mutations'


const PartnerAPI = ({ partner, }) => {
  const {colors} = useTheme()

  const [show, setShow] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isValid, setIsValid] = React.useState(true)
  const [validPassword, setValidPassword] = React.useState(true)
  
  const [loading, setLoading] = React.useState(false)

  const valueInputRef = React.useRef()
  const passwordInputRef = React.useRef()

  const [locale] = useContext(LocaleContext);

  const [partnerSubmit] = useMutation(gql(mutations.partnerSubmit), {
    fetchPolicy: 'no-cache',
  })


  return (
    <Box alignItems={"center"}>
      <Text mt={4}>{partner.contentTitle}</Text>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
      <Button mt={4}
        onPress={() => { setShow(true) }}
      >{partner.contentListButton}</Button>      
      
      <Modal
        isOpen={show}
        onClose={() => {
          setShow(false)
          setInputValue()
          setPassword()
          setShowPassword(false)
          setIsValid(true)
          
          valueInputRef.current.blur()
          passwordInputRef.current.blur()

        }}
        size={'xl'}
        w={'100%'}
        >
        <Modal.Content bg={'white'} px={5}>
          <Modal.CloseButton
            _icon={Object({ color: colors.primary["600"] })}
            _pressed={Object({ bg: 'white' })}
          />
          <Modal.Header>
            <Text
              fontSize={18}
              fontWeight={'bold'} 
              color={'primary.600'}
            >
              {partner.contentTitle}
            </Text>
          </Modal.Header>

          <Modal.Body pt={11}>
            <Image resizeMode={'contain'} width={"100%"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>
            <HTML source={{ html: partner.contentBody }} />

            <FormControl mt="3" isInvalid={!isValid}>
              <FormControl.Label>Number</FormControl.Label>
              <Input 
                  ref={valueInputRef}
                  value={inputValue}
                  onChangeText={(text) => {
                    setInputValue(text)
                  }}
                  />

            
            {!isValid && (
              <FormControl.ErrorMessage>
                Invalid Card Number
                </FormControl.ErrorMessage>
                )}
            </FormControl>

            { partner.inputPassword && (
            <FormControl mt="3" isInvalid={!validPassword}>
              <FormControl.Label>Password</FormControl.Label>
              <Input 
                  ref={passwordInputRef}
                  value={password}
                  onChangeText={(text) => { setPassword(text) }}
                  secureTextEntry={!showPassword}
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      {!showPassword && (
                        <Image
                          source={require('../../assets/images/eye-slash-icon.png')}
                          alt="show password"
                          w="20px"
                          h="18px"
                          mr={'10px'}
                        />
                      )}
                      {showPassword && (
                        <Image
                          source={require('../../assets/images/eye-icon.png')}
                          alt="hide password"
                          w="24px"
                          h="24px"
                          mr={2}
                        />
                      )}
                    </Pressable>
                  }
                  />
                {!validPassword && (
                  <FormControl.ErrorMessage>
                    Enter your password
                  </FormControl.ErrorMessage>
                )}
            </FormControl>
            )}

            <Button
              // isDisabled={true}
              onPress={async () => {}}
              mt={50}
            >
              Submit
            </Button>
            
          </Modal.Body>
        </Modal.Content>

        </Modal>
    </Box>
  )
}

const PartnerPage = ({ partner, }) => {
  const [show, setShow] = React.useState(false)
  const {colors} = useTheme()

  var htmlContent = partner.contentBody;
  htmlContent = htmlContent.replaceAll('src="/assets/', 'src="' + AppConfig.rootUri + '/assets/');
  
  return (
    <Box alignItems={"center"}>
      <Text mt={4}>{partner.contentTitle}</Text>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
      <Button 
        mt={4}
        onPress={() => { setShow(true) }}
        >
          {partner.contentListButton}
      </Button>   
      {/* <HTML source={{ html: htmlContent }} /> */}

      <Modal
        isOpen={show}
        onClose={() => {
          setShow(false)
        }}
        size={'xl'}
        >
        <Modal.Content bg={'white'} px={5}>
          <Modal.CloseButton
            _icon={Object({ color: colors.primary["600"] })}
            _pressed={Object({ bg: 'white' })}
          />
          <Modal.Header>
            <Text
              fontSize={18}
              fontWeight={'bold'} 
              color={'primary.600'}
            >
              {partner.contentTitle}
            </Text>
          </Modal.Header>

          <Modal.Body pt={11}>
            <Image resizeMode={'contain'} width={"100%"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>
            <HTML source={{ html: htmlContent }} />
          </Modal.Body>
        </Modal.Content>

        </Modal>
    </Box>
  );
};

const PartnerItem = ({ partner, }) => {

  console.log(partner.contentImage)
  return (
    <Box alignItems={"center"} m={5}>
      <Image resizeMode={'contain'} width={"100px"} height={"100px"} source={Object({uri: AppConfig.rootUri + partner.contentImage})} alt={partner.identifier}/>               
      <Text>{partner.contentListLabel}</Text>
    </Box>
  );
};

const PartnerTicket = ({ partner }) => {
  let partnerItem;
  console.log("partner item", partner);

  switch (partner.type) {
    case "api": 
      partnerItem = <PartnerAPI partner={partner} />;
      break;
    case "item":
      partnerItem = <PartnerItem partner={partner} />;
      break;
    case "page":
      partnerItem = <PartnerPage partner={partner} />;
      break;
    default:
      partnerItem = null;
      break;
  }

  if (!partnerItem) return null;

  return (
    <Pressable>
      <Box
        borderWidth={1}
        borderColor={"primary.600"}
        px={4}
        pb={4}
        rounded={12}
        mb={3}
      >
        {partnerItem}
      </Box>
    </Pressable>
  );
};

export default PartnerTicket;
