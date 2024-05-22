import {getSections} from "@/app/actions/materials/sections.actions";
import {SectionTable} from "@/components/sections.table";
import AlertError from "@/components/common/error";
import NoDataComponent from "@/components/no-data";

export default async function  SectionsPage() {
    const  {error,data}  = await getSections()
    if (error) {
        return <AlertError error={error} />
    }
    if (!data) {
        return <NoDataComponent />
    }
    return (
        <SectionTable data={data} />
    )
}