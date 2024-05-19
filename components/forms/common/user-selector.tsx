import { FormControl } from '@/components/ui/form';
import {
	ControllerRenderProps,
	FieldValues,
	UseFormReturn,
} from 'react-hook-form';
import { Suspense } from 'react';
import GridLoader from '@/components/icons/grid';
import { getUsers } from '@/app/actions/staff/teacher.actions';
import AlertError from '@/components/common/error';
import { CommonCombobox } from '@/components/common/combobox';

type Props = {
	label: string;
	field: ControllerRenderProps<FieldValues, string>;
	setUpdatedValue: (key: string, value: string) => void;
	fieldKey: string;
};

export async function UserSelector({
	field,
	setUpdatedValue,
	fieldKey,
}: Props) {
	const { data, status, error } = await getUsers();
	const options: { label: string; value: string }[] = data.map((user) => ({
		label: user.email,
		value: user.id,
	}));
	if (status !== 200) {
		return <div>Something went wrong</div>;
	}
	if (error) {
		return <AlertError error={error} />;
	}
	return (
		<Suspense fallback={<GridLoader />}>
			<FormControl>
				<CommonCombobox
					options={options}
					field={field}
					setUpdatedValue={setUpdatedValue}
					fieldKey={fieldKey}
				/>
			</FormControl>
		</Suspense>
	);
}
