import { Breadcrumb, Flex, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import HomeIcon from "../../assets/breadcrumb-home.svg?react";
import ArrowRight from "../../assets/arrow-right.svg?react";

type BreadcrumbsProps = {
  secondPage: string;
  secondPagePath: string;
  thirdPage: string;
};

const AppBreadcrumbs = ({ secondPage, secondPagePath, thirdPage }: BreadcrumbsProps) => {
  return (
    <Box>
      <Breadcrumb.Root>
        <Breadcrumb.List fontSize="16px">
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild _hover={{ textDecoration: "none" }} textDecoration="underline">
              <Link to="/">
                <Flex align="center" gap="6px">
                  <HomeIcon />
                  <Text
                    backgroundImage="linear-gradient(92deg, #5FD8FF 0.39%, #9969FF 65.86%, #704FE5 102.04%)"
                    backgroundClip="text"
                    color="transparent"
                  >
                    Home
                  </Text>
                </Flex>
              </Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <ArrowRight />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Link asChild color="#919191" textDecoration="underline">
              <Link to={secondPagePath}>{secondPage}</Link>
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>
            <ArrowRight />
          </Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.CurrentLink>{thirdPage}</Breadcrumb.CurrentLink>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </Box>
  );
};

export default AppBreadcrumbs;
