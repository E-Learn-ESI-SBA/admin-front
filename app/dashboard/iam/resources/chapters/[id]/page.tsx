import {ChapterInstance} from "@/components/iam/rebac/chapters";

type Props = {
    params: {
        id: string
    }
}
export default function  ModuleInstancePage({params}:Props) {

    return <ChapterInstance instanceKey={params.id} />
}