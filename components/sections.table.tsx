import {Section} from "@/types/modules";
import {DataTable} from "@/components/common/table";


type Props =  {
        data : Required<Section>[]
}
export function SectionTable({data}:Props) {

    return (
        <DataTable defaultFilter="name" headers={[
            {
                accessorKey:"name",
                title:"Name",
            }
        ]} data={data} url="iam/resources/sections" />
    )
}