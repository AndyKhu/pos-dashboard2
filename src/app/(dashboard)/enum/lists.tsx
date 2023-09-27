"use client"
import Table from "@/components/ui/table-withheader";
import { enumTableConfig } from "./config/column";
import { TEnumDB } from "@/lib/type/tenumdb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useTextFilter } from "@/lib/utils/filters";
import { TMenuPermission } from "@/lib/type/tmenu";
import { THeaderOption } from "@/components/page-container";

interface EnumListsProps{
  data: TEnumDB[]
  eventHandler: {
    handleSelectedEdit: ()=> void
    handleSelectedDelete: ()=> void
  },
  headerOption: THeaderOption
  selection:{
    rowSelection: any
    setRowSelection: (e:any) => void
  }
  permission: TMenuPermission
}
const EnumLists = ({headerOption,data,selection,eventHandler,permission}:EnumListsProps) => {
  const [searchfilter, setSearchFilter] = useState("")
  return (
    <Table data={data} columns={enumTableConfig} caption="Enum list table" selectable headerOption={headerOption} selection={selection} filters={[useTextFilter(searchfilter)]} pagination={10}>
      <Input icon="Search" value={searchfilter} onChange={(e) => setSearchFilter(e.target.value)} placeholder="Search..." className="col-span-2"/>
      <Button onClick={()=> eventHandler.handleSelectedEdit()} variant="success" className={Object.keys(selection.rowSelection).length === 1 && permission.edit ?"":"hidden"} disabled={Object.keys(selection.rowSelection).length !== 1 || !permission.edit}>Edit</Button>
      <Button onClick={()=> eventHandler.handleSelectedDelete()} variant="destructive" className={Object.keys(selection.rowSelection).length > 0 && permission.delete?"":"hidden"} disabled={Object.keys(selection.rowSelection).length === 0 || !permission.delete}>Delete</Button>
    </Table>
  );
}

export default EnumLists;