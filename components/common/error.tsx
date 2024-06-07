import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { IError } from "@/types/errors";
type Props = {
	error: IError;
};
export default function AlertError({ error }: Props) {
	return (
		<div className="flex flex-col justify-center items-center w-full h-full p-16">
			<Alert variant="destructive">
				<ExclamationTriangleIcon className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					{error?.message ?? "Something went wrong!, please try again"}
				</AlertDescription>
			</Alert>
		</div>
	);
}
