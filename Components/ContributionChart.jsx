import React from 'react';

import { Dimensions, } from "react-native";

import { useTranslation, } from 'react-i18next';

import {
  ContributionGraph,
} from 'react-native-chart-kit';

import {
  useTheme,
} from 'native-base';



export default ({ chartType, chartData, }) => {
  const [t,] = useTranslation();
  const { colors, } = useTheme();

  let endDate = new Date();
  endDate.setDate(endDate.getDate() + 1)

  const hexToRGB = (hex, alpha = 1) => {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  }

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => hexToRGB(colors.primary["600"], opacity),
  };

  var commitsData = [];
  chartData.data.forEach((item) => {
    commitsData.push({
      date: item.key,
      count: item.value,
    });
  });

  return (
    <ContributionGraph
      values={commitsData}
      endDate={endDate}
      numDays={100}
      width={Dimensions.get("window").width - 60}
      height={200}
      chartConfig={chartConfig}
      style={{
        // borderWidth: 1,
        // borderColor: colors.brandPrimary,
        paddingRight: 40,
        paddingLeft: 0,
        background: 'red'
      }}
    />
  )
}