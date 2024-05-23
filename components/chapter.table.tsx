import {Chapter, ChapterWithModuleName} from "@/types/modules";
import {DataTable} from "@/components/common/table";


type Props =  {
    data : Required<ChapterWithModuleName>[]
}
export function ChapterTable({data}:Props) {

    return (
        <DataTable defaultFilter="name" headers={[
            {
                accessorKey:"name",
                title:"Name",
            }, {
            accessorKey:"module_name",
                title:"Module Name"
            }
        ]} data={data} url="iam/resources/chapters" />
    )
}