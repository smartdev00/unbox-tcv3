import React from 'react';

import { Dimensions, } from "react-native";

import { useTranslation, } from 'react-i18next';

import {
  LineChart,
} from 'react-native-chart-kit';

import {
  useTheme,
} from 'native-base';



export default ({ chartType, chartData, }) => {
  const [t, ] = useTranslation();
  const { colors, } = useTheme();

  var dailyLabels = t('litter:screens.dashboard.statistics.dailyLabels', { returnObjects: true, });

  var monthlyLabels = [    
    t('1'),
    t('2'),
    t('3'),
    t('4'),
    t('5'),
    t('6'),
    t('7'),       
    t('8'),       
    t('9'),       
    t('10'),       
    t('11'),       
    t('12'),
  ];

  if (chartType === "daily") {
    const lastElements = dailyLabels.slice(chartData.current-7);
    dailyLabels = lastElements.concat(dailyLabels.slice(0, chartData.current-7));
  } else {
    const lastElements = monthlyLabels.slice(chartData.current-12);
    monthlyLabels = lastElements.concat(monthlyLabels.slice(0, chartData.current-12));
  }

  const getLabels = (labels, current) => {    
    return [].concat(labels.slice(current + 1, labels.length)).concat(labels.slice(0, current + 1));
  }

  const data = {    
    get labels() {
      switch (chartType) {
        case 'daily': return dailyLabels;
        case 'monthly': return monthlyLabels;
        default: [];
      }
    },
    datasets: [
      {
        data: chartData.data || [],
        color: (opacity = 1) => "black", // optional
        strokeWidth: 1.5 // optional
      }
    ],    
  }



  const chartConfig = {
    backgroundGradientFrom: "white",    
    backgroundGradientTo: "white",    
    fromZero: true,    
    color: (opacity = 1) => colors.primary["600"],
    lineColor: (opacity = 1) => colors.primary["500"],
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
    fillShadowGradientToOpacity: 0,
    fillShadowGradientFromOpacity: 0,
    propsForDots: {
      r: "4",
      strokeWidth: "2",
      fill: colors.primary["600"],
      stroke: colors.primary["600"],
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // Specify a custom dash pattern
      strokeWidth: 1, // Set the width of the background lines
      strokeOpacity: 0.3, // Set the opacity of the background lines
      stroke: colors.primary["600"], // Set the color of the background lines
    }
  };
  
  return (
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 100}
      height={200}
      chartConfig={chartConfig}     
      withInnerLines={true}   
      withOuterLines={false}
      withHorizontalLines={true}
      withVerticalLines={false}
      segments={6}
      yAxisInterval={2}
      formatYLabel={(label) => { return Math.floor(label)}}      
      title={ { display: true, text : chartData.type} }
      style={ { 
        // borderWidth: 1,
        // borderColor: colors.brandPrimary,
        paddingRight: 40,
        paddingLeft: 20
      }}
    />
  )
}