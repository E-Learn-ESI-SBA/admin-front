import {Module} from "@/types/modules";
import {DataTable} from "@/components/common/table";
import {deleteModule} from "@/app/actions/materials/modules.actions";
import {toast} from "sonner";


type Props ={
    data  : Required<Module>[]
}
export function ModulesTable({data}:Props) {
        const deleteHandler = async (row:Module):Promise<void> => {
                try {
                    const {data,error} = await deleteModule(row.id!)
                    if (error) {
                         toast.error(error.message,{
                            style:{
                                backgroundColor:"ref",
                                color:"white"
                            }
                        })
                        return
                    }
                 toast.success(data.message,{
                    style:{
                        backgroundColor:"green",
                        color:"white"
                    }
                })
                    return
                }catch (e) {
                    console.log("error",e)
                    toast.error("Error While Deleting Module",{
                        style:{
                            backgroundColor:"red",
                            color:"white"
                        }
                    })
                    return 
                }
        }
        return (
            <DataTable defaultFilter="name" headers={[{
                title: "Name",
                accessorKey:"name"
            },{
                accessorKey:"year",
                title:"Year"
            },{
                title:"Speciality",
                accessorKey:"speciality"
            },{
                title:"Semester",
                accessorKey:"semester"
            }]} data={data} fuzzyElements={["semester","speciality"]} url="iam/resources/modules" deleteHandler={deleteHandler} />
        )
}