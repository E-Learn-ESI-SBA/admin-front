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
		const groupArr = StringToArray(group, ',');
		return {
			label: groupArr[1], // g8,
			value: group, // 2021-g8
		};
	});
};

export const optionsToGroup = (options: { label: string; value: string }[]) => {
	// Convert array of objects to array of groups
	return options.map((option) => {
		return option.value;
	});
};
