import { Table } from "@chakra-ui/react";
import CartItemRow from "./CartItemRow";

const CartTable = () => {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row bgColor="#1D1D1D" textTransform="uppercase">
          <Table.ColumnHeader color="#FFF">Product</Table.ColumnHeader>
          <Table.ColumnHeader color="#FFF" textAlign="center">
            Quantity
          </Table.ColumnHeader>
          <Table.ColumnHeader color="#FFF" textAlign="end">
            Price
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <CartItemRow />
        <CartItemRow />
      </Table.Body>
    </Table.Root>
  );
};

export default CartTable;
