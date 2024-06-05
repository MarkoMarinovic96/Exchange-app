import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto max-h-[1100px] shadow-lg rounded-lg border border-gray-200">
    <table
      ref={ref}
      className={cn("w-full text-sm text-left text-gray-500", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

type TableSortLabelProps = {
  active: boolean;
  direction: "asc" | "desc";
  onClick: () => void;
  children: React.ReactNode;
};

const TableSortLabel: React.FC<TableSortLabelProps> = ({
  active,
  direction,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center space-x-1 font-medium transition-colors rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
      active ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    )}
  >
    {children}
    {active ? (
      <svg
        className={cn(
          "w-4 h-4 transition-transform",
          direction === "asc"
            ? "transform rotate-90"
            : "transform rotate-[270deg]"
        )}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M5.293 9.707a1 1 0 010-1.414L9.586 4H10a1 1 0 010 1.414L7.414 8H15a1 1 0 110 2H7.414l2.586 2.586A1 1 0 019 15a1 1 0 01-.707-.293l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <span className="w-[16px] h-[16px]"></span>
    )}
  </button>
);

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("[&_tr]:border-b  text-white", className)}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0 bg-white", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-gray-100 font-medium text-gray-700 [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("border-b transition-colors hover:bg-gray-50", className)}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-2 lg:px-6  py-3 text-xs text-pretty  lg:text-nowrap  font-medium uppercase tracking-wider text-left text-gray-500 bg-gray-100",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "px-2 lg:px-6  py-4 whitespace-nowrap text-pretty  lg:text-nowrap  text-gray-700",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-gray-500", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableSortLabel,
};
