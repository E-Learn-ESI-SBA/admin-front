import {ChapterTable} from "@/components/chapter.table";
import {getCourses} from "@/app/actions/materials/chapter.actions";
import AlertError from "@/components/common/error";
import NoDataComponent from "@/components/no-data";

export const dynamic = "force-dynamic";

export default async function ChaptersPage() {
    const {data,error}= await getCourses()
    if (error) {
        return <AlertError error={ error} />

    }
    if (!data) {
        return <NoDataComponent />
    }
    return (
        <ChapterTable data={data} />
    )
}