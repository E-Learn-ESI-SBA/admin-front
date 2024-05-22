import {ModuleInstance} from "@/components/iam/rebac/modules";

type Props = {
    params: {
        id: string
    }
}
export default function  ModuleInstancePage({params}:Props) {

    return <ModuleInstance instanceKey={params.id} />
}