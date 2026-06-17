import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ConditionalLinkProps = {
  condition: boolean;
  to: string;
  children: ReactNode;
};

const ConditionalLink = ({ condition, to, children }: ConditionalLinkProps) => {
  return condition ? (
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
};

export default ConditionalLink