export default (props) => (
	<button
		type="submit"
		class={`${
			props.condition
				? `bg-${props.colors[0]}-400 hover:bg-${props.colors[0]}-300`
				: `bg-${props.colors[1]}-400 hover:bg-${props.colors[1]}-300`
		} text-dark-900 mx-8 w-32 rounded-lg p-1 text-center outline-none`}
	>
		{props.condition ? props.labels[0] : props.labels[1]}
	</button>
);
