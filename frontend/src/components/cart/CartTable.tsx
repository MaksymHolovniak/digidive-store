import { Table } from "@chakra-ui/react";
import CartItemRow from "./CartItemRow";
import type { CartItem } from "@/types/cart.types";

type CartTableProps = {
  items: CartItem[];
};

const CartTable = ({ items }: CartTableProps) => {
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
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default CartTable;
