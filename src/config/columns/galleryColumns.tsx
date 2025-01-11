import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CircleArrowOutUpRight, MoreHorizontal, Trash2 } from "lucide-react";
import Image from "next/image";

export type Gallery = {
  id: string;
  title: string;
  images: string[];
};

export const galleryColumns: ColumnDef<Gallery>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images = row.getValue("images") as string[];
      return (
        <div className="flex gap-2">
          {images && images.length > 0 ? (
            images
              .slice(0, 3)
              .map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="w-10 h-10 object-cover rounded"
                  width={40}
                  height={40}
                />
              ))
          ) : (
            <div className="w-10 h-10 rounded bg-gray-200" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Gallery Title",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("title")}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: true,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="text-secondary-500 ">
              <Trash2 /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleArrowOutUpRight /> Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
