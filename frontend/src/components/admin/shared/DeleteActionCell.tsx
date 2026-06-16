import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuTrash2, LuX, LuArchive } from "react-icons/lu";

type DeleteActionCellProps = {
  elementId: number;
  onDelete: (id: number) => Promise<void>;
  isArchived?: boolean;
};

const DeleteActionCell = ({ elementId, onDelete, isArchived = false }: DeleteActionCellProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    await onDelete(elementId);
    setIsConfirming(false);
  };

  if (isConfirming) {
    return (
      <Flex gap="2" align="center" justify="flex-end">
        <Text fontSize="12px" color="red.500" fontWeight="600">
          Are you sure?
        </Text>
        <Button size="sm" h="28px" bg="red.500" color="white" _hover={{ bg: "red.600" }} onClick={handleConfirm}>
          Delete
        </Button>
        <IconButton
          variant="outline"
          size="sm"
          h="28px"
          w="28px"
          onClick={() => setIsConfirming(false)}
          aria-label="Cancel"
        >
          <LuX size={14} />
        </IconButton>
      </Flex>
    );
  }

  if (isArchived) {
    return (
      <IconButton variant="ghost" colorPalette="gray" size="sm" disabled cursor="not-allowed">
        <LuArchive size={16} />
      </IconButton>
    );
  }

  return (
    <IconButton
      variant="ghost"
      colorPalette="red"
      size="sm"
      onClick={() => setIsConfirming(true)}
      aria-label="Delete item"
    >
      <LuTrash2 size={16} />
    </IconButton>
  );
};

export default DeleteActionCell;
