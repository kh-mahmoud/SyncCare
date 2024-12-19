"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { DataTablePagination } from "./DataTablePagination"
import { useState } from "react"
import { Input } from "./ui/input"
import { DataTableFacetedFilter } from "./DataTableFaceted"
import { StatusIcon } from "@/constants"
import { DataTableVisibility } from "./DataTableVisibility"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data, }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onSortingChange: setSorting,
            getSortedRowModel: getSortedRowModel(),
            onColumnFiltersChange: setColumnFilters,
            getFilteredRowModel: getFilteredRowModel(),

            state: {
                sorting,
                columnFilters,

            },

        })

        const options=[
            {
            label:"scheduled",
            value:"scheduled",
            icon:StatusIcon["scheduled"]
           },
           {
            label:"pending",
            value:"pending",
            icon:StatusIcon["pending"]
           },
           {
            label:"cancelled",
            value:"cancelled",
            icon:StatusIcon["cancelled"]
           }
    ]

    return (
        <div className="flex flex-col p-0 m-0 w-full gap-3">
            <div className="flex justify-end items-center w-full gap-4">
                <DataTableFacetedFilter title="Status" column={table.getColumn("status")} options={options} />
                <DataTableVisibility table={table}/>
            </div>
            <div className="data-table">
                <Table className="shad-table">
                    <TableHeader className="bg-dark-200">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="shad-table-row-header">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="shad-table-row"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
