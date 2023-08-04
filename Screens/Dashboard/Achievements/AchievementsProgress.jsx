import React from 'react';
import { useTranslation } from "react-i18next";

import {
  Box,
  ScrollView,
  Text,
} from 'native-base';


const AchievementsProgress = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{t("litter:screens.achievements.title.progress")}</Text>
    </Box>
  )
}

export default AchievementsProgress;