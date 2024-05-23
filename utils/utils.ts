export const ArrayToString = (arr: string[], separator: ',' | '-' | '_') => {
	// Sprint the array to string with separator
	return arr.join(separator);
};

export const StringToArray = (str: string, separator: ',' | '-' | '_') => {
	// Split the string to array with separator
	return str.split(separator);
};

export const groupToOptions = (groups: string[]) => {
	// Convert array of groups to array of objects with label and value
	return groups.map((group) => {
		// const groupArr = StringToArray(group, '-');
		return {
			label: group, // g8
			value: group, // g8
		};
	});
};

export const optionsToGroup = (options: { label: string; value: string }[]) => {
	// Convert array of objects to array of groups
	return options.map((option) => {
		return option.value;
	});
};


export function humanFileSize(bytes: number, si = false, dp = 1) {
	const thresh = si ? 1000 : 1024;
	if (Math.abs(bytes) < thresh) {
		return bytes + " B";
	}

	const units = si
		? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
		: ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
	let u = -1;
	const r = 10 ** dp;

	do {
		bytes /= thresh;
		++u;
	} while (
		Math.round(Math.abs(bytes) * r) / r >= thresh &&
		u < units.length - 1
		);

	return bytes.toFixed(dp) + " " + units[u];
}