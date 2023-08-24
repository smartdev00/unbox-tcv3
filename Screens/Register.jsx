import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Row,
  Spinner,
  Text,
} from "native-base";

import UnboxLitterSVG from "../Components/UnboxLitterSVG";
import {
  Linking,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";

import { RegisterMailThemed } from "../Components/ThemedSVGs";
import { AppConfig } from "../config";
import { BackButton } from "../Components";

const SuccessView = ({ navigation, email }) => {
  const { t } = useTranslation();
  const [counter, setCounter] = useState(0);

  const handleResendEmail = async () => {
    setCounter((prevState) => prevState + 1);

    // prevent multiple resends
    if (counter >= 2) return;

    const input = {
      email,
      ssoIdentifier: "API Consumer Registration",
    };

    await fetch(AppConfig.resendUri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
  };

  return (
    <Box flex={1} safeArea bg={"white"}>
      <Box alignItems={"center"} justifyContent={"center"} h={"80px"}>
        <UnboxLitterSVG height={45} />
      </Box>
      <Box flex={1} justifyContent={"flex-end"} px={6} pb={6}>
        <Box mb={20} alignItems={"center"}>
          <RegisterMailThemed />
        </Box>
        <Text
          fontSize={31}
          fontWeight={700}
          color={"primary.600"}
          textAlign={"center"}
          mb={7}
        >
          {t("litter:screens.register.success.title")}
        </Text>
        <Text variant={"paragraph2"} textAlign={"center"} mb={5}>
          {t("litter:screens.register.success.text1")}
        </Text>
        <Text variant={"paragraph2"} textAlign={"center"} mb={50}>
          {t("litter:screens.register.success.text2")}
        </Text>
        <Button onPress={handleResendEmail} mb={2}>
          {t("litter:screens.register.success.resendButton")}
        </Button>
        <Button onPress={() => navigation.navigate("Login")} mb={9}>
          {t("litter:screens.register.success.loginButton")}
        </Button>
        <Text
          variant={"paragraph2"}
          color={"primary.600"}
          fontWeight={700}
          textAlign={"center"}
          onPress={() =>
            Linking.openURL("https://uat.the-click.app/consumer/faqs")
          }
        >
          {t("litter:screens.register.success.help")}
        </Text>
      </Box>
    </Box>
  );
};

const legalLinks = {
  en: {
    terms: "https://www.the-click.be/en/terms-and-conditions",
    privacy: "https://www.the-click.be/en/privacy-statement",
  },
  nl: {
    terms: "https://www.the-click.be/nl/algemene-voorwaarden",
    privacy: "https://www.the-click.be/nl/privacyverklaring",
  },
  fr: {
    terms: "https://www.the-click.be/fr/conditions-generales",
    privacy: "https://www.the-click.be/fr/declaration-de-confidentialite",
  },
};

const RegisterScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [givenName, setGivenName] = useState();
  const [familyName, setFamilyName] = useState();
  const [email, setEmail] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterAccepted, setNewsletterAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [missingGivenName, setMissingGivenName] = useState(false);
  const [missingFamilyName, setMissingFamilyName] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingTermsAccepted, setMissingTermsAccepted] = useState(false);

  useEffect(() => setMissingGivenName(false), [givenName]);

  useEffect(() => setMissingFamilyName(false), [familyName]);

  useEffect(() => setMissingTermsAccepted(false), [termsAccepted]);

  const handleLink = async (type) => {
    const link = legalLinks[i18n.language][type];
    
    if (link) {
      await Linking.openURL(link);
    }
  };


  useEffect(() => {
    setMissingEmail(false);
    setInvalidEmail(false);
    setErr(null);
  }, [email]);

  const submitRegistration = async () => {
    if (!givenName) setMissingGivenName(true);
    if (!familyName) setMissingFamilyName(true);
    if (!email) setMissingEmail(true);

    if (!givenName || !familyName || !email) return;

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setInvalidEmail(true);
      return;
    }

    if (!termsAccepted) {
      setMissingTermsAccepted(true);
      return;
    }

    const input = {
      firstName: givenName,
      lastName: familyName,
      email,
      ssoIdentifier: "API Consumer Registration",
    };

    try {
      setLoading(true);

      const response = await fetch(AppConfig.registerUri, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const responseJson = await response.json();

      if (!responseJson.success) {
        setErr(true);
        return;
      }

      setSuccess(true);
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  if (success) return <SuccessView navigation={navigation} email={email} />;

  return (
    <Box flex={1} safeArea bg={"white"}>
    <KeyboardAvoidingView
      style={Object({ flex: 1})}  
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView flex={1}>
            <Box alignItems={"center"} justifyContent={"center"} h={"80px"}>
              <UnboxLitterSVG height={45} />
            </Box>
            <Box px={6} pt={53} flex={1}>
              <Text
                variant={"heading1"}
                colorScheme={"primary"}
                textAlign={"center"}
                mb={6}
              >
                {t("litter:screens.register.title")}
              </Text>
              <Text
                variant={"body3"}
                textAlign={"center"}
                mb={60}
                w={"50%"}
                mx={"auto"}
              >
                {t("litter:screens.register.details")}
              </Text>

              <FormControl isRequired isInvalid={missingGivenName} mb={3}>
                <FormControl.Label>
                  <Text variant={"body1"}>
                    {t("litter:screens.register.fields.givenName")}
                  </Text>
                </FormControl.Label>
                <Input
                  value={givenName || ""}
                  placeholder={t("litter:screens.register.fields.givenName")}
                  onChangeText={(text) => setGivenName(text)}
                  bg="#ffffff"
                  h={36}
                />
                {missingGivenName && (
                  <FormControl.ErrorMessage>
                    {t("common:required")}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isRequired isInvalid={missingFamilyName} mb={3}>
                <FormControl.Label>
                  <Text variant={"body1"}>
                    {t("litter:screens.register.fields.familyName")}
                  </Text>
                </FormControl.Label>
                <Input
                  value={familyName || ""}
                  placeholder={t("litter:screens.register.fields.familyName")}
                  onChangeText={(text) => setFamilyName(text)}
                  bg="#ffffff"
                  h={36}
                />
                {missingFamilyName && (
                  <FormControl.ErrorMessage>
                    {t("common:required")}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl
                isRequired
                isInvalid={missingEmail || invalidEmail}
                mb={6}
              >
                <FormControl.Label>
                  <Text variant={"body1"}>
                    {t("litter:screens.register.fields.email")}
                  </Text>
                </FormControl.Label>
                <Input
                  value={email || ""}
                  placeholder={t("litter:screens.register.fields.email")}
                  onChangeText={(text) => setEmail(text)}
                  bg="#ffffff"
                  h={36}
                />
                {missingEmail && (
                  <FormControl.ErrorMessage>
                    {t("common:required")}
                  </FormControl.ErrorMessage>
                )}
                {invalidEmail && (
                  <FormControl.ErrorMessage>
                    {t("common:invalidEmail")}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              {err && (
                <Box
                  borderColor={"#D10000"}
                  borderWidth={1}
                  rounded={5}
                  py={2}
                  px={4}
                  bg={"#D1000033"}
                  mb={3}
                >
                  <Text variant={"body3"}>
                    {t("litter:screens.register.error")}
                  </Text>
                </Box>
              )}

              <FormControl>
                <Row mb={2}>
                  <Checkbox
                    value={termsAccepted}
                    onChange={() => setTermsAccepted(!termsAccepted)}
                    mr={"5px"}
                    aria-label={"terms"}
                  />
                  <Text variant={"paragraph2"}>
                    <Trans
                      t={t}
                      i18nKey="litter:screens.register.terms"
                      components={[
                        <Text
                          fontWeight={700}
                          color={"primary.600"}
                          onPress={() => handleLink('terms')
                            // Linking.openURL("https://uat.the-click.app/terms")
                          }
                        />,
                        <Text
                          fontWeight={700}
                          color={"primary.600"}
                          onPress={() => handleLink('privacy')
                            // Linking.openURL("https://uat.the-click.app/privacy")
                          }Ò
                        />,
                      ]}
                    />
                  </Text>
                </Row>

                {missingTermsAccepted && (
                  <Box
                    borderColor={"#D10000"}
                    borderWidth={1}
                    rounded={5}
                    py={2}
                    px={4}
                    bg={"#D1000033"}
                    mb={3}
                  >
                    <Text variant={"body3"}>
                      {t("litter:screens.register.missingTerms")}
                    </Text>
                  </Box>
                )}

                <Row>
                  <Checkbox
                    value={newsletterAccepted}
                    onChange={() => setNewsletterAccepted(!newsletterAccepted)}
                    mr={"5px"}
                    aria-label={"newsletter"}
                  />
                  <Text variant={"paragraph2"}>
                    {t("litter:screens.register.newsletter")}
                  </Text>
                </Row>
              </FormControl>

              <Box flex={1} justifyContent={"flex-end"} my={6}>
                <Button
                  mb={6}
                  onPress={() => submitRegistration()}
                  _text={Object({
                    fontSize: 14,
                    fontWeight: 700,
                  })}
                >
                  {!loading && t("litter:screens.register.button")}
                  {loading && <Spinner color={"white"} />}
                </Button>

                <HStack justifyContent={"center"} space={1}>
                  <Text variant={"body3"}>
                    {t("litter:screens.register.noAccountYet")}
                  </Text>
                  <Text
                    variant={"body3"}
                    color="primary.600"
                    fontWeight={700}
                    onPress={() => navigation.navigate("Login")}
                  >
                    {t("litter:screens.register.loginHere")}
                  </Text>
                </HStack>
              </Box>
            </Box>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <BackButton navigation={navigation} />
    </Box>
  );
};

export default RegisterScreen;
