import { Button, ButtonGroup, IconButton, Pagination, Text } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ProductsPagination = () => {
  return (
    <Pagination.Root count={20} pageSize={2} defaultPage={1} mx="auto">
      <ButtonGroup variant="ghost" size="xl" border="1px solid #D1D1D1">
        <Pagination.PrevTrigger asChild>
          <Button px="15px" _hover={{ backgroundColor: "#E4D9FD" }}>
            <LuChevronLeft />
            <Text>Previous</Text>
          </Button>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton
              key={page.value}
              variant="ghost"
              _selected={{ border: "1px solid #1D1D1D" }}
              _hover={{ backgroundColor: "#E4D9FD" }}
            >
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <Button px="15px" _hover={{ backgroundColor: "#E4D9FD" }}>
            <Text>Next</Text>
            <LuChevronRight />
          </Button>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};

export default ProductsPagination;
