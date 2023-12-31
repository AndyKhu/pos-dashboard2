import { CellContext, ColumnDef, HeaderContext, Row, RowData, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { CheckedState } from '@radix-ui/react-checkbox'
import React, { useCallback, useMemo } from "react"
import { Checkbox } from "./checkbox"
import { ArrowDown, Lock} from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ScrollArea } from "./scroll-area"
import { Card } from "./card"
export interface TableProps<TData, TValue> {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
  caption: string
  defaultRows?: number
  overflow?: string
  empty?: React.ReactNode
  fixed?: boolean
  sorting?: boolean
  selectable?: boolean
  filters?: ((rows: TData[]) => TData[])[]
  pagination?: boolean | number
  handleUpdateTable: (rowIndex: number, columnId: string, value: unknown)=> void

  className?: string
  children?: React.ReactNode
  selection:{
    rowSelection: any
    setRowSelection: (e:any) => void
  }
}

declare module '@tanstack/react-table' {
  // All declarations of 'ColumnMeta' must have identical type parameters
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
    align?: 'left' | 'center' | 'right'
  }
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

function SelectionHeader<TData, TValue>({ table }: HeaderContext<TData, TValue>) {
  let checked: CheckedState = false
  const rows = table.getRowModel().flatRows
  const selectedRows = table.getSelectedRowModel().flatRows

  if (table.getIsAllRowsSelected()) checked = true
  else if (selectedRows.length > 0) checked = 'indeterminate'

  return (
    <Checkbox checked={checked} disabled={rows.length === 0} onCheckedChange={() => table.toggleAllRowsSelected()}  className="bg-white data-[state=checked]:bg-white data-[state=checked]:text-primary dark:data-[state=checked]:bg-white dark:data-[state=indeterminate]:bg-white dark:data-[state=indeterminate]:text-primary"/>
  )
}

function SelectionCell<TData, TValue>({ row }: CellContext<TData, TValue>) {
  return row.getCanSelect() ? (
    <div className="h-4">
      <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
    </div>
  ) : (
    <Lock className="mt-1 p-[1px] w-[18px] h-[20px]" />
  )
}

const Table = <TData extends { id?: string | number; disableSelection?: boolean },TValue,>({
  data,
  columns: userColumns,
  caption,
  defaultRows = 1,
  overflow,
  empty = "No rows displayed",
  fixed,
  sorting = false,
  selectable,
  filters=[],
  pagination,
  className,
  children,
  selection,
  handleUpdateTable,
  ...props
}:TableProps<TData,TValue>) => {
  const columns = useMemo(() => {
    if (selectable) {

      return [
        {
          id: 'selection',
          enableSorting: false,
          enableResizing: false,
          enableGlobalFilter: false,
          meta: { className: "w-[40px]" },
          header: SelectionHeader,
          cell: SelectionCell,
        },
        ...userColumns,
      ] as ColumnDef<TData, TValue>[]
    }
    return userColumns
  }, [selectable, userColumns])
  const filteredData = useMemo(() => filters.reduce((d, f) => f(d), data), [data, filters])
  const getRowId = useCallback((row: TData, index: number, parent?: Row<TData>) => {
    if (row.id) return row.id.toString()
    if (parent) return [parent.id, index].join('.')
    return index.toString()
  }, [])
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const table = useReactTable({
    data: filteredData,
    columns,
    initialState: {
      pagination: {
        pageSize: typeof pagination === 'number' ? pagination : 10,
      },
    },
    enableSorting: sorting,
    enableRowSelection: selectable ? (row) => !row.original.disableSelection : false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    onRowSelectionChange: selection.setRowSelection,
    autoResetPageIndex,
    state: {
      rowSelection: selection.rowSelection
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        handleUpdateTable(rowIndex,columnId,value)
      },
    },
  })

  const { pageSize, pageIndex } = table.getState().pagination
  const count = filteredData.length
  const getDisplayRowsFrom = () => Math.min(count, pageIndex * pageSize + 1)
  const getDisplayedRowsTo = () => Math.min(count, (pageIndex + 1) * pageSize)
  const handleRowClick = (row: Row<TData>,event: any): { row: Row<TData>,event: any } => {
    if(event.target.localName!="input")
        row.toggleSelected()
    return { row ,event};
  }
  return (
    <>
      {children?<>{children}</>:null}
    <Card>
      <div className={cn(className,"relative")} {...props}>
        <div className="relative shadow-sm rounded-md bg-card w-full overflow-hidden text-slate-950 dark:text-white text-sm">
          <ScrollArea>
            <table className={cn("align-middle border-collapse border-spacing-0 w-full text-left",fixed?"table-fixed":"",overflow?overflow:"min-w-[300px]")}>
              <VisuallyHidden.Root asChild>
                <caption>{caption}</caption>
              </VisuallyHidden.Root>
              <thead className="bg-primary dark:bg-neutral-800 vertical-inherit text-white text-sm font-medium">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr className="vertical-inherit" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const { meta = {} } = header.column.columnDef
                      const { getCanSort, getToggleSortingHandler } = header.column
                      const sort = sorting && getCanSort()
                      const handler = getToggleSortingHandler()

                      return (
                        <th className={cn("vertical-inherit p-3  text-primary-foreground dark:text-muted-foreground text-sm font-medium", meta.className)} key={header.id} style={{ textAlign: meta.align }}>
                          {header.isPlaceholder ? null : (
                            <div
                              className={cn(sort && "flex items-center gap-1 transition-colors cursor-pointer border-none rounded bg-none p-0 text-inherit select-none focus-visible:outline-0 focus-visible:shadow-sm hover:text-slate-950")}
                              onClick={handler}
                              onKeyDown={(e) => {
                                if (e.key === ' ' || e.key === 'Enter') {
                                  e.preventDefault()
                                  handler?.(e)
                                }
                              }}
                              role={sort ? 'button' : undefined}
                              tabIndex={sort ? 0 : undefined}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {sort ? (
                                <ArrowDown
                                  className="transition-transform w-[16px] h-[16px]"
                                  style={{
                                    opacity: header.column.getIsSorted() ? 1 : 0,
                                    transform: header.column.getIsSorted() === 'asc' ? 'rotate(-180deg)' : undefined,
                                  }}
                                />
                              ) : null}
                            </div>
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="vertical-inherit">
                {table.getRowModel().rows.map((row) => (
                  <tr className="vertical-inherit cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800" key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const { meta = {} } = cell.column.columnDef

                      return (
                        <td className={cn("vertical-inherit p-3 shadow-sm text-slate-800 dark:text-slate-200 text-sm font-medium", meta.className)} key={cell.id} style={{ textAlign: meta.align }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full text-primary dark:text-primary-foreground text-center" style={{ height: `${(defaultRows?defaultRows:1)*44}px` }}>
                {empty}
              </div>
            ) : null}
          </ScrollArea>
        </div>
        {pagination ? (
        <div className="flex items-center justify-between p-3">
          <p className="text-sm text-muted-foreground">
            {getDisplayRowsFrom()}-{getDisplayedRowsTo()} of {count}
          </p>

          <div className="grid grid-cols-2 gap-3">
            <Button disabled={!table.getCanPreviousPage()} onClick={table.previousPage} size="sm">
              Previous
            </Button>
            <Button disabled={!table.getCanNextPage()} onClick={table.nextPage} size="sm">
              Next
            </Button>
          </div>
        </div>
        ) : null}
      </div>
    </Card>
    </>
  );
}

export default Table;