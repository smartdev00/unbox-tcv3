import { Button, Modal, Pressable, HStack, Text, useTheme } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from "react-i18next";
import format from "date-fns/format";
import { center } from '@turf/turf'

const SSOLinkModal = ({
  show,
  onClose,
  ipemail,
  identityProvider,
  setIsCreate
}) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { colors } = useTheme()

  const handleOnClose = () => {
    if (onClose) onClose();
  }

  const handleOnCreate = () => {
    setIsCreate(true);
  }

  const handleOnLink = async () => {
    navigation.navigate('Login', { ipemail, identityProvider });
    onClose();
  }

  return (
    <Modal
      isOpen={show}
      onClose={() => handleOnClose()}
      size={'xl'}
    >
      <Modal.Content bg={'white'} px={5}>
        <Modal.CloseButton
          _icon={Object({ color: colors.primary["600"] })}
          _pressed={Object({ bg: 'white' })}
        />
        <Modal.Header
          bg={'white'}
          pb={3}
          px={1}
        >
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'primary.600'}
          >
            Alert
          </Text>
        </Modal.Header>
        <Modal.Body pt={6}>
          <Text
            fontSize={13}
            lineHeight={18}
            fontWeight={'bold'}
            mb={7}
          >
            Do you wish to create new or assign to existing?
          </Text>
          <Button
            onPress={() => handleOnCreate()}
            colorScheme={'primary'}
            _text={Object({ fontWeight: 'bold' })}
            mb={4}
          >
            Create
          </Button>

          <Pressable
            bg={"white"}
            borderWidth={1}
            borderColor={"primary.600"}
            h={42}
            rounded={33}
            onPress={() => handleOnLink()}
            mb={4}
          >
            <HStack alignItems={"center"} h={'100%'} w={'100%'}
              px={6} space={1}
              justifyContent={center}
            >
              <Text variant={"body2"} colorScheme={"primary"} fontWeight={"bold"}>
                Link to existing
              </Text>
            </HStack>
          </Pressable>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default SSOLinkModal
