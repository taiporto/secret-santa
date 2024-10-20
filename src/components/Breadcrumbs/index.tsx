import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

type BreadcrumbsProps = {
  paths: {
    label: string;
    href: string;
    isCurrentPage?: boolean;
  }[];
};

export const Breadcrumbs = ({ paths }: BreadcrumbsProps) => {
  return (
    <Breadcrumb spacing="8px" separator={<FaChevronRight color="accent.500" />}>
      {paths.map((path) => {
        return (
          <BreadcrumbItem isCurrentPage={path.isCurrentPage} key={path.label}>
            <BreadcrumbLink
              href={path.href}
              color={path.isCurrentPage ? "secondary.800" : undefined}
              textDecoration={path.isCurrentPage ? "underline" : "none"}
              _hover={{ textDecoration: "underline" }}
            >
              {path.label}
            </BreadcrumbLink>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
