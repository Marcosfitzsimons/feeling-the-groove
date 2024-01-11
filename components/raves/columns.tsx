"use client";

import { Rave } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StarRating } from "../ui/star-rating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { correctDateFormat } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Rave>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dbDate: Date = row.getValue("date");
      return <div className="font-medium">{correctDateFormat(dbDate)}</div>;
    },
  },
  {
    accessorKey: "ayn",
    header: () => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="flex items-center gap-1">
              Ayn
              <Icons.info className="w-3.5 aspect-square" />
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col">
              <p className="flex items-center gap-1 text-xs">
                <span className="bg-red-400 rounded-full w-2 aspect-square" />
                Short fasting period
              </p>
              <p className="flex items-center gap-1 text-xs">
                <span className="bg-blue-400 rounded-full w-2 aspect-square" />
                Moderate fasting period
              </p>
              <p className="flex items-center gap-1 text-xs">
                <span className="bg-green-400 rounded-full w-2 aspect-square" />
                Extended fasting period
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
    cell: ({ row }) => {
      const ayn: number = row.getValue("ayn");
      if (ayn <= 14) {
        return (
          <div className="flex items-center gap-1">
            {ayn}
            <span className="bg-red-400 rounded-full w-2 aspect-square" />
          </div>
        );
      } else if (ayn > 14 && ayn < 30) {
        return (
          <div className="flex items-center gap-1">
            {ayn}
            <span className="bg-blue-400 rounded-full w-2 aspect-square" />
          </div>
        );
      } else {
        return (
          <div className="flex items-center gap-1">
            {ayn}
            <span className="bg-green-400 rounded-full w-2 aspect-square" />
          </div>
        );
      }
    },
  },
  {
    accessorKey: "djs",
    header: "Djs",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "candy",
    header: "Candy",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "anecdotes",
    header: "Anecdotes",
    cell: ({ row }) => {
      const anecdote: String = row.getValue("anecdotes");
      return (
        <ScrollArea className="h-[60px] w-[300px] rounded-md border px-4 py-1">
          {anecdote}
        </ScrollArea>
      );
    },
  },
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank
          <Icons.arrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rank: Number = row.getValue("rank");

      return <StarRating rank={Number(rank)} />;
    },
  },
];
