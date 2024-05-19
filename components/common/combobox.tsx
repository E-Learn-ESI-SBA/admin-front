'use client';

import * as React from 'react';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormControl } from '@/components/ui/form';

type Props = {
	options: { value: string; label: string }[];
	field: ControllerRenderProps<FieldValues, string>;
	setUpdatedValue: (key: string, value: string) => void;
	fieldKey: string;
};
export function CommonCombobox({
	options,
	field,
	fieldKey,
	setUpdatedValue,
}: Props) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant="outline"
						role="combobox"
						className={cn(
							'w-[200px] justify-between',
							!field.value && 'text-muted-foreground'
						)}>
						{field.value
							? options.find((option) => option.value === field.value)?.label
							: 'Select language'}
						<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search framework..." className="h-9" />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								value={option.label}
								key={option.value}
								onSelect={() => {
									setUpdatedValue(fieldKey, option.value);
								}}>
								{option.label}
								<CheckIcon
									className={cn(
										'ml-auto h-4 w-4',
										option.value === field.value ? 'opacity-100' : 'opacity-0'
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
