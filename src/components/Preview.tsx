import MarkdownIt from "markdown-it";
import Highlight from "highlight.js/lib/core";
import { locale, PREVIEWING_AS, tr } from "../translation";
import emoji from "markdown-it-emoji";
import { createEffect, onCleanup } from "solid-js";

const md = new MarkdownIt({
	linkify: true,
	breaks: true,
	highlight: function (str, lang) {
		if (lang && Highlight.getLanguage(lang)) {
			try {
				return Highlight.highlight(str, { language: lang }).value;
			} catch (__) {}
		}
		if (!lang) {
			try {
				return Highlight.highlightAuto(str).value;
			} catch (__) {}
		}

		return ""; // use external default escaping
	},
});
md.use(emoji);

const defaultRender =
	md.renderer.rules.link_open ||
	((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options));

md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
	tokens[idx].attrPush(["target", "_blank"]);
	tokens[idx].attrPush([
		"class",
		"text-blue-400 underline hover:text-blue-300",
	]);
	return defaultRender(tokens, idx, options, env, self);
};

export default function Preview(props) {
	return (
		<div
			class={`<lg:w-full relative flex flex-col p-8 lg:flex-1 ${
				props.class || ""
			}`}
		>
			<div class="bg-dark-800 left-0 h-14 w-full rounded-lg rounded-b-none p-2 opacity-90">
				<span class="text-light-100 inline-block p-2">
					{" "}
					{(props.label || tr(locale(), PREVIEWING_AS))(props.language)}
				</span>
			</div>
			<div
				ref={props.ref}
				class={`bg-dark-400 text-light-100 h-full ${
					props.fullHeight ? "" : "overflow-y-scroll"
				} min-h-128 break-all rounded-lg rounded-t-none p-4 opacity-80 ${
					props.language === "markdown"
						? "preview-md"
						: "whitespace-pre-wrap font-mono"
				} `}
				innerHTML={
					props.language && props.language === "markdown"
						? md.render(
								props.value
									.replace(/([^\S\r\n]+$|^[^\S\r\n]+)/gm, "")
									.replace(/\n$/gm, "\n&nbsp;"),
						  )
						: Highlight.highlight(props.value, { language: props.language })
								.value
				}
			/>
		</div>
	);
}
