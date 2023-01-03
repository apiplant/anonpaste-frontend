export default (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 100 100"
		class={props.class}
	>
		<path
			fill="none"
			stroke={props.stroke || "#0f0f0f"}
			stroke-width="8"
			stroke-dasharray="42.765 42.765"
			d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20c-19.3 0-32.1-40-51.4-40z"
			stroke-linecap="round"
			style="transform:scale(.8);transform-origin:50px 50px"
		>
			<animate
				attributeName="stroke-dashoffset"
				repeatCount="indefinite"
				dur="1.5s"
				keyTimes="0;1"
				values="0;256.58892822265625"
			/>
		</path>
	</svg>
);
