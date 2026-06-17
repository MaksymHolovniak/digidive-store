import { Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { LuTrash2, LuArchive, LuX, LuRefreshCw } from "react-icons/lu";

type DeleteActionCellProps = {
  elementId: number;
  onDelete: (id: number) => Promise<void>;
  isArchived?: boolean;
  variant?: "delete" | "archive";
};

const DeleteActionCell = ({
  elementId,
  onDelete,
  isArchived = false,
  variant = "delete", 
}: DeleteActionCellProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirm = async () => {
    await onDelete(elementId);
    setIsConfirming(false);
  };

  const ActiveIcon = variant === "archive" ? LuArchive : LuTrash2;
  const activeColor = variant === "archive" ? "orange" : "red";

  if (isConfirming) {
    return (
      <Flex gap="2" align="center" justify="flex-end">
        <Text
          fontSize="12px"
          color={isArchived ? "green.500" : variant === "archive" ? "orange.500" : "red.500"}
          fontWeight="600"
        >
          {isArchived ? "Restore product?" : variant === "archive" ? "Archive product?" : "Are you sure?"}
        </Text>
        <Button
          size="sm"
          h="28px"
          bg={isArchived ? "green.500" : variant === "archive" ? "orange.500" : "red.500"}
          color="white"
          _hover={{ bg: isArchived ? "green.600" : variant === "archive" ? "orange.600" : "red.600" }}
          onClick={handleConfirm}
        >
          {isArchived ? "Restore" : variant === "archive" ? "Archive" : "Delete"}
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
      <IconButton
        variant="ghost"
        colorPalette="green"
        size="sm"
        onClick={() => setIsConfirming(true)}
        title="Restore product from archive"
        aria-label="Restore item"
      >
        <LuRefreshCw size={16} />
      </IconButton>
    );
  }

  return (
    <IconButton
      variant="ghost"
      colorPalette={activeColor}
      size="sm"
      onClick={() => setIsConfirming(true)}
      title={variant === "archive" ? "Move product to archive" : "Delete item"}
      aria-label={variant === "archive" ? "Archive item" : "Delete item"}
    >
      <ActiveIcon size={16} />
    </IconButton>
  );
};

export default DeleteActionCell;
