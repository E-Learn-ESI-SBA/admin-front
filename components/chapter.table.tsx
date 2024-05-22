import {Chapter} from "@/types/modules";
import {DataTable} from "@/components/common/table";


type Props =  {
    data : Required<Chapter>[]
}
export function ChapterTable({data}:Props) {

    return (
        <DataTable defaultFilter="name" headers={[
            {
                accessorKey:"name",
                title:"Name",
            }
        ]} data={data} url="iam/resources/chapters" />
    )
}