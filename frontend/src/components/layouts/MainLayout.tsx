import { Box } from "@chakra-ui/react"
import Header from "./header/Header"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
    return (
        <Box>
            <Header />
            <Box as='main'>
                <Outlet />
            </Box>
        </Box>
    )
}

export default MainLayout