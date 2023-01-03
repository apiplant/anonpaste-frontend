export default (props) => (
	<a
		href={props.href}
		target={props.target}
		onClick={props.onClick}
		class={
			props.classOverride ||
			`cursor-pointer text-blue-400 underline outline-none hover:text-blue-300 ${props.class}`
		}
	>
		{props.children}
	</a>
);
