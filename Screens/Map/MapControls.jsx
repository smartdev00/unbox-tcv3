import React, { useEffect, useState } from "react";

import { useTheme, Box, Circle, Divider, Pressable, Text, VStack } from "native-base";

import {
  CurrentLocation,
  MerchantMapControl,
  Plogging,
} from "../../assets/svg";

const CenterControl = ({
  selected,
  visible = true,
  enabled,
  onSelectedChange,
  
}) => {
  const { colors } = useTheme()
  return (
    <Pressable onPress={() => onSelectedChange(!selected)}>
      <Circle
        borderColor={"primary.600"}
        borderWidth={1}
        bgColor={"primary.600"}
        size={"45px"}        
      >
        <CurrentLocation fillColor={"white"} />
      </Circle>
    </Pressable>
  );
};

const PloggingControl = ({
  selected,
  visible = true,
  enabled,
  onSelectedChange,
}) => {
  const { colors } = useTheme()
  return (
    <Pressable onPress={() => onSelectedChange(!selected)}>
      <Circle
        borderColor={"primary.600"}
        borderWidth={1}
        bgColor={selected ? "primary.600" : "white"}
        size={"45px"}        
      >
        <Plogging fillColor={selected ? "white" : colors.primary['600']} />
      </Circle>
    </Pressable>
  );
};

const MerchantsControl = ({
  selected,
  visible = true,
  enabled,
  onSelectedChange,
}) => {
  const { colors } = useTheme()
  if (!visible) return null;
  return (
    <Pressable onPress={() => onSelectedChange(!selected)}>
      <Circle
        borderColor={"primary.600"}
        borderWidth={1}
        bgColor={selected ? "primary.600" : "white"}
        size={"45px"}        
      >
        <MerchantMapControl fillColor={selected ? "white" : colors.primary['600']} />
      </Circle>
    </Pressable>
  );
};

const MapControls = ({ isRecording = false, ploggingSelected, centerSelected, onCenterSelected, onPloggingSelected, merchantsSelected, onMerchantsSelected }) => {
  const [center, setCenter] = useState(centerSelected);
  const [plogging, setPlogging] = useState(ploggingSelected);
  const [merchants, setMerchants] = useState(merchantsSelected);

  const togglePlogging = (selected) => {
    if (selected) {
      setPlogging(true);
      setMerchants(false);
    } else {
      setPlogging(false);
    }
  };

  const toggleMerchants = (selected) => {
    if (selected) {
      setMerchants(true);
      setPlogging(false);
    } else {
      setMerchants(false);
    }
  };

  useEffect(() => {
    if (onCenterSelected) onCenterSelected(center);
  }, [center]);

  useEffect(() => {
    if (onPloggingSelected) onPloggingSelected(plogging);
  }, [plogging]);  

  useEffect(() => {
    if (onMerchantsSelected) onMerchantsSelected(merchants);
  }, [merchants])  

  return (
    <Box
      position={"absolute"}
      top={0}
      right={0}
      m={3}
      // alignItems={"center"}
    >
      <VStack space={2}>
        <CenterControl
          selected={center}
          onSelectedChange={(selected) => setCenter(selected)}
        />
        <PloggingControl
          selected={plogging}
          onSelectedChange={(selected) => togglePlogging(selected)}
        />
        <MerchantsControl
          visible={!isRecording}
          selected={merchants}
          onSelectedChange={(selected) => toggleMerchants(selected)}
        />
      </VStack>
    </Box>
  );
};

export default MapControls;
