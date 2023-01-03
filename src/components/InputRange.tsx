export default (props) => (
	<input
		type="range"
		value={props.value}
		min={props.min}
		max={props.max}
		step="1"
		onInput={(event) =>
			props.onChange(Number((event.target as HTMLInputElement).value))
		}
		class="w-full lg:w-32 accent-blue-500"
	/>
);
