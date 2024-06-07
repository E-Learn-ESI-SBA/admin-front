import {getModules} from "@/app/actions/materials/modules.actions";
import AlertError from "@/components/common/error";
import NoDataComponent from "@/components/no-data";
import {ModulesTable} from "@/components/module.table";


export const dynamic = "force-dynamic";


export  default async function ModulesPage() {

    const {data , error } = await  getModules()
    if (error) {
        return <AlertError error={error} />
    }
    if (!data) {
        return <NoDataComponent  />
    }
    return (
        <ModulesTable data={data} />
    )
}