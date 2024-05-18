
type Props = {
    instanceKey: string;
}
export function GroupInstance({instanceKey}: Props) {
    return (
        <div className="w-full h-full p-4 bg-white rounded-2xl">
            <iframe
                title="Permit Element group-rebac"
                src={`https://embed.permit.io/group-rebac?envId=6b2f1b047b6b4143bd45d7201f818814&darkMode=false&resourceInstanceKey=${instanceKey}`}
                width="100%"
                height="100%"
                style={{
                    border:"none"
                }}/>
        </div>
    )


}