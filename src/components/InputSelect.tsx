import { For } from "solid-js";

export default (props) => (
	<label
		class={`min-w-${props.width || 32} inline-block text-blue-300`}
		for={props.id}
	>
		[
		<select
			id={props.id}
			class=" mx-1 inline bg-transparent text-blue-300 outline-none appearance-none pr-6"
			onChange={(event) =>
				props.onChange((event.target as HTMLSelectElement).value)
			}
			value={props.value}
		>
			<For each={props.options}>
				{(option: string, i) => (
					<option value={option} selected={option === props.selected}>
						{props.optionLabels ? props.optionsLabels[i()] : option}
					</option>
				)}
			</For>
		</select>
		<span class="inline-block transform rotate-90 relative -left-4 -mr-3 pointer-events-none">
			›
		</span>
		]
	</label>
);
