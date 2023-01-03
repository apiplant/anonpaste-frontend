import { locale, PASSWORD, tr } from "../translation";

export default (props) => (
	<>
		[
		<input
			type="password"
			placeholder={tr(locale(), PASSWORD)}
			class="mx-1 w-32 bg-transparent outline-none"
			value={props.value}
			onInput={(event) =>
				props.onChange((event.target as HTMLInputElement).value)
			}
		/>
		]
	</>
);
