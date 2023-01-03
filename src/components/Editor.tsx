import {
	createEffect,
	createMemo,
	createSignal,
	For,
	onCleanup,
} from "solid-js";
import Highlight from "highlight.js/lib/core";
import Preview from "./Preview";
import {
	locale,
	HIGHLIGHT_AS,
	INSERT_YOUR_PASTE,
	PREVIEW,
	SCROLL_DOWN,
	tr,
	CLEAR,
} from "../translation";
import { DEFAULT_LANGUAGE } from "../config";

import java from "highlight.js/lib/languages/java";
import xml from "highlight.js/lib/languages/xml";
import markdown from "highlight.js/lib/languages/markdown";
import r from "highlight.js/lib/languages/r";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import ini from "highlight.js/lib/languages/ini";
import matlab from "highlight.js/lib/languages/matlab";
import lua from "highlight.js/lib/languages/lua";
import rust from "highlight.js/lib/languages/rust";
import elm from "highlight.js/lib/languages/elm";
import wasm from "highlight.js/lib/languages/wasm";
import bash from "highlight.js/lib/languages/bash";
import shell from "highlight.js/lib/languages/shell";
import qml from "highlight.js/lib/languages/qml";
import makefile from "highlight.js/lib/languages/makefile";
import swift from "highlight.js/lib/languages/swift";
import ruby from "highlight.js/lib/languages/ruby";
import csharp from "highlight.js/lib/languages/csharp";
import diff from "highlight.js/lib/languages/diff";
import perl from "highlight.js/lib/languages/perl";
import kotlin from "highlight.js/lib/languages/kotlin";
import objectivec from "highlight.js/lib/languages/objectivec";
import ocaml from "highlight.js/lib/languages/ocaml";
import lisp from "highlight.js/lib/languages/lisp";
import graphql from "highlight.js/lib/languages/graphql";
import yaml from "highlight.js/lib/languages/yaml";
import php from "highlight.js/lib/languages/php";
import phpTemplate from "highlight.js/lib/languages/php-template";
import cpp from "highlight.js/lib/languages/cpp";
import nix from "highlight.js/lib/languages/nix";
import vbnet from "highlight.js/lib/languages/vbnet";
import sql from "highlight.js/lib/languages/sql";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import haskell from "highlight.js/lib/languages/haskell";
import erlang from "highlight.js/lib/languages/erlang";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import elixir from "highlight.js/lib/languages/elixir";
import protobuf from "highlight.js/lib/languages/protobuf";
import less from "highlight.js/lib/languages/less";
import plaintext from "highlight.js/lib/languages/plaintext";
import scss from "highlight.js/lib/languages/scss";
import go from "highlight.js/lib/languages/go";
import json from "highlight.js/lib/languages/json";
import c from "highlight.js/lib/languages/c";
import Link from "./Link";
import InputSelect from "./InputSelect";

Highlight.registerLanguage("java", java);
Highlight.registerLanguage("xml", xml);
Highlight.registerLanguage("markdown", markdown);
Highlight.registerLanguage("r", r);
Highlight.registerLanguage("javascript", javascript);
Highlight.registerLanguage("typescript", typescript);
Highlight.registerLanguage("ini", ini);
Highlight.registerLanguage("matlab", matlab);
Highlight.registerLanguage("lua", lua);
Highlight.registerLanguage("rust", rust);
Highlight.registerLanguage("elm", elm);
Highlight.registerLanguage("wasm", wasm);
Highlight.registerLanguage("bash", bash);
Highlight.registerLanguage("shell", shell);
Highlight.registerLanguage("qml", qml);
Highlight.registerLanguage("makefile", makefile);
Highlight.registerLanguage("swift", swift);
Highlight.registerLanguage("ruby", ruby);
Highlight.registerLanguage("csharp", csharp);
Highlight.registerLanguage("diff", diff);
Highlight.registerLanguage("perl", perl);
Highlight.registerLanguage("kotlin", kotlin);
Highlight.registerLanguage("objectivec", objectivec);
Highlight.registerLanguage("ocaml", ocaml);
Highlight.registerLanguage("lisp", lisp);
Highlight.registerLanguage("graphql", graphql);
Highlight.registerLanguage("yaml", yaml);
Highlight.registerLanguage("php", php);
Highlight.registerLanguage("php-template", phpTemplate);
Highlight.registerLanguage("cpp", cpp);
Highlight.registerLanguage("nix", nix);
Highlight.registerLanguage("vbnet", vbnet);
Highlight.registerLanguage("sql", sql);
Highlight.registerLanguage("dockerfile", dockerfile);
Highlight.registerLanguage("haskell", haskell);
Highlight.registerLanguage("erlang", erlang);
Highlight.registerLanguage("python", python);
Highlight.registerLanguage("css", css);
Highlight.registerLanguage("elixir", elixir);
Highlight.registerLanguage("protobuf", protobuf);
Highlight.registerLanguage("less", less);
Highlight.registerLanguage("plaintext", plaintext);
Highlight.registerLanguage("scss", scss);
Highlight.registerLanguage("go", go);
Highlight.registerLanguage("json", json);
Highlight.registerLanguage("c", c);

export default function Editor(props) {
	let textareaRef;
	let codeRef;
	let previewRef;

	createEffect(() => {
		const onResize = () => {
			textareaRef.style.height = "100%";
			codeRef.style.height = "100%";
			if (previewRef) previewRef.style.height = "100%";
			textareaRef.style.height = `${textareaRef.offsetHeight}px`;
			codeRef.style.height = `${codeRef.offsetHeight}px`;
			if (previewRef) previewRef.style.height = `${previewRef.offsetHeight}px`;
		};
		window.addEventListener("resize", onResize);
		onResize();
		onCleanup(() => window.removeEventListener("resize", onResize));
	});

	const [content, setContent] = createSignal("");
	createEffect(() => {
		setContent(props.value);
	});
	const [selectedLanguage, setSelectedLanguage] = createSignal(
		props.language || DEFAULT_LANGUAGE,
	);
	const languages = createMemo(() => Highlight.listLanguages());
	const [preview, setPreview] = createSignal(window.innerWidth > 1024);
	const onInput = (event) => {
		const target = event.target as HTMLTextAreaElement;
		setContent(target.value);
		if (props.onInput) props.onInput(target.value);
	};
	const onKeyDown = (event) => {
		if (event.keyCode === 9) {
			const target = event.target as HTMLTextAreaElement;
			event.preventDefault();

			target.setRangeText(
				"\t",
				target.selectionStart,
				target.selectionStart,
				"end",
			);
			setContent(target.value);
			if (props.onInput) props.onInput(target.value);
		}
	};
	const onScroll = () => {
		codeRef.scrollTop = textareaRef.scrollTop;
	};
	const onLanguageSelected = (value) => {
		if (props.onLanguageSelected) props.onLanguageSelected(value);
		setSelectedLanguage(value);
	};
	const onPreview = () => {
		setPreview(!preview());
	};
	const onClear = () => {
		const oldContent = content();
		setContent("");
		if (props.onInput) props.onInput("");
		if (props.onClear) props.onClear(oldContent);
	};

	return (
		<>
			<div
				class={`p-8 ${
					preview() ? "lg:pr-4" : ""
				} <lg:w-full relative flex flex-col lg:flex-1  ${props.class || ""}`}
			>
				<div class="bg-dark-800 <lg:flex-col <lg:justify-between left-0 flex w-full rounded-lg rounded-b-none p-4 opacity-90">
					<div>
						<span class="text-light-100">{tr(locale(), HIGHLIGHT_AS)}</span>
						<InputSelect
							id="select-language"
							onChange={onLanguageSelected}
							value={selectedLanguage()}
							options={languages()}
							selected={selectedLanguage()}
						/>
					</div>
					<div class="<lg:mt-4 lg:ml-8">
						<input
							type="checkbox"
							id="preview-checkbox"
							onChange={onPreview}
							checked={preview()}
						/>
						<label for="preview-checkbox" class="px-2 text-blue-300">
							{tr(locale(), PREVIEW)}{" "}
							<span class="text-light-100 text-xs lg:hidden">
								({tr(locale(), SCROLL_DOWN)})
							</span>
						</label>
					</div>
					<div class="<lg:mt-4 lg:ml-8">
						<Link onClick={onClear}>{tr(locale(), CLEAR)}</Link>
					</div>
				</div>
				<div class="relative flex-1">
					<textarea
						ref={textareaRef}
						class="caret-light-100 min-h-128 absolute top-0 z-10 h-full w-full resize-none overflow-y-scroll whitespace-pre-wrap break-all border-0 bg-transparent p-4 text-transparent outline-none"
						onInput={onInput}
						onKeyDown={onKeyDown}
						onScroll={onScroll}
						value={props.value || ""}
						readOnly={props.readOnly}
						placeholder={tr(locale(), INSERT_YOUR_PASTE)}
					/>
					<div
						ref={codeRef}
						class="bg-dark-400 text-light-100 min-h-128 h-full overflow-y-scroll whitespace-pre-wrap break-all rounded-lg rounded-t-none p-4 opacity-80"
						innerHTML={
							Highlight.highlight(content(), { language: selectedLanguage() })
								.value
						}
					/>
				</div>
			</div>
			{preview() && (
				<Preview
					class="<lg:pt-4 lg:pl-4"
					value={content()}
					language={selectedLanguage()}
					ref={previewRef}
				/>
			)}
		</>
	);
}
