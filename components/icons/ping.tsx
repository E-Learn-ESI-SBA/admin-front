export function Ping({ color }: Props) {
	return (
		<span className="relative flex  h-3 w-3">
			<span
				className="animate-ping absolute inline-flex h-full w-full rounded-full   opacity-75"
				style={{ backgroundColor: color }}
			/>
			<span
				className="relative inline-flex rounded-full h-3 w-3"
				style={{ backgroundColor: color }}
			/>
		</span>
	);
}
type Props = {
	color: string;
};
