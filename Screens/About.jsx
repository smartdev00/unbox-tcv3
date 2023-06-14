import { Box, ScrollView } from 'native-base'
import UnboxLitterSVG from '../Components/UnboxLitterSVG'
import AboutContent from './About/AboutContent'

const About = () => {
  return (
    <ScrollView bgColor="white">
      <Box alignItems={'center'} mt={85} mb={101}>
        <UnboxLitterSVG />
      </Box>
      <AboutContent />
    </ScrollView>
  )
}

export default About
