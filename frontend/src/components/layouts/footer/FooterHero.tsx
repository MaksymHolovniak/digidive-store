import { Flex, Image, Text } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import InstagramIcon from "../../../assets/instagram.svg?react";
import YoutubeIcon from "../../../assets/youtube.svg?react";
import LinkedinIcon from "../../../assets/linkedin.svg?react";
import TwitterIcon from "../../../assets/twitter.svg?react";
import s from './Footer.module.css'

const FooterHero = () => {
  return (
    <Flex direction="column" gap="32px">
      <Image src={logo} alt="DigiDive logo" w="200px" h="60px" />
      <Text
        fontSize="40px"
        fontWeight="600"
        background="linear-gradient(104deg, #5FD8FF -7%, #9969FF 42.06%, #FF4B4B 91.11%)"
        backgroundClip="text"
        maxW="470px"
        as="h2"
      >
        The world’s biggest hub of Smart Products and Services
      </Text>
      <Flex gap="24px" align="center" className={s.footerIcon}>
        <InstagramIcon />
        <YoutubeIcon />
        <LinkedinIcon />
        <TwitterIcon />
      </Flex>
    </Flex>
  );
};

export default FooterHero;
