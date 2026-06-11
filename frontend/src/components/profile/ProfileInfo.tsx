import { Box, Flex, Text } from "@chakra-ui/react";
import { LuUser } from "react-icons/lu";

type ProfileInfoProps = {
    email: string | undefined
}

const ProfileInfo = ({ email }: ProfileInfoProps) => {
    return (
      <Box bg="#FFF" p="30px" borderRadius="16px" border="1px solid #E2E8F0">
        <Flex direction="column" align="center" textAlign="center" mb="24px">
          <Box color="#9969FF" bg="#F3EEFF" p="18px" borderRadius="full" mb="16px">
            <LuUser size={36} />
          </Box>
          <Text fontSize="18px" fontWeight="600" color="#464646">
            {email}
          </Text>
        </Flex>
      </Box>
    );
}

export default ProfileInfo