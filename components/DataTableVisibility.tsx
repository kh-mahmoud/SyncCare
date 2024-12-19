import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table } from "@tanstack/react-table"
import { View } from "lucide-react";


interface DataTableVisibilityProps<TData> {
    table: Table<TData>
}


export function DataTableVisibility<TData>({ table }: DataTableVisibilityProps<TData>) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="ml-auto flex gap-2  bg-dark-400 hover:bg-[rgba(255,255,255,0.1)]">
                        <View className="h-5 w-5" />
                        <span>View</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-dark-400 bg-dark-300 " align="end">
                    {table.getAllColumns().filter(
                            (column) => column.getCanHide()
                        )
                        .map((column) => {
                            return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize hover:bg-[rgba(255,255,255,0.1)] cursor-pointer   "
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            )
                        })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}


