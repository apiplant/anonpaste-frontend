import { createSignal } from "solid-js";
import Editor from "../components/Editor";
import InputPassword from "../components/InputPassword";
import InputRange from "../components/InputRange";
import InputSubmit from "../components/InputSubmit";
import Logo from "../components/Logo";
import Spinner from "../components/Spinner";
import { DEFAULT_LANGUAGE } from "../config";
import { createStoredSignal } from "../lib/createStoredSignal";
import { encrypt, getId } from "../lib/crypto";
import * as Paste from "../lib/paste";
import {
	locale,
	ARE_YOU_SURE_CLEAR,
	CREATE,
	EXPIRES_d,
	EXPIRES_h,
	EXPIRES_m,
	EXPIRES_no,
	EXPIRES_uv,
	EXPIRES_v,
	EXPIRES_w,
	EXPIRES_y,
	STATUS_EMPTY,
	STATUS_FAILED,
	STATUS_SUBMITTING,
	STATUS_SUCCESS,
	tr,
	COPY,
	COPIED,
} from "../translation";

const expiryTimeMap = [
	() => Date.now() + 5 * 60 * 1000,
	() => Date.now() + 10 * 60 * 1000,
	() => Date.now() + 60 * 60 * 1000,
	() => Date.now() + 24 * 60 * 60 * 1000,
	() => Date.now() + 7 * 24 * 60 * 60 * 1000,
	() => new Date().setMonth(new Date().getMonth() + 1),
	() => new Date().setFullYear(new Date().getFullYear() + 1),
	() => null,
];

const expiryViewsMap = [
	() => 1,
	() => 10,
	() => 100,
	() => 1000,
	() => 10000,
	() => null,
];

const expiryViewsLabelMap = (i) =>
	[
		tr(locale(), EXPIRES_v)(1),
		tr(locale(), EXPIRES_v)(10),
		tr(locale(), EXPIRES_v)(100),
		tr(locale(), EXPIRES_v)(1000),
		tr(locale(), EXPIRES_v)(10000),
		tr(locale(), EXPIRES_uv),
	][i];

const expiryTimeLabelMap = (i) =>
	[
		tr(locale(), EXPIRES_m)(5),
		tr(locale(), EXPIRES_m)(10),
		tr(locale(), EXPIRES_h)(1),
		tr(locale(), EXPIRES_d)(1),
		tr(locale(), EXPIRES_w)(1),
		tr(locale(), EXPIRES_m)(1),
		tr(locale(), EXPIRES_y)(1),
		tr(locale(), EXPIRES_no),
	][i];

export default function Create() {
	const [paste, setPaste] = createSignal("");
	const [language, setLanguage] = createStoredSignal(
		"language",
		DEFAULT_LANGUAGE,
	);
	const [password, setPassword] = createSignal("");
	const [link, setLink] = createSignal("");
	const [savingStatus, setSavingStatus] = createSignal("");
	const [expiryTime, setExpiryTime] = createStoredSignal("expiryTime", 3);
	const [expiryViews, setExpiryViews] = createStoredSignal("expiryViews", 5);
	const [copied, setCopied] = createSignal(false);
	const onCreate = async (event) => {
		window.scrollTo({ top: 0, behavior: "smooth" });
		event.preventDefault();
		if (savingStatus() === STATUS_SUBMITTING) {
			return;
		}

		if (!paste().trim()) {
			setSavingStatus(STATUS_EMPTY);
			setTimeout(() => setSavingStatus(""), 1000);
			return;
		}

		setSavingStatus(STATUS_SUBMITTING);
		const id = getId();
		const { content, key } = await encrypt(
			`${language()}:${paste()}`,
			password(),
		);
		try {
			const expiryTimeValue = expiryTimeMap[expiryTime()]();
			const res = await Paste.create({
				id,
				content,
				expiryTime: expiryTimeValue && Math.round(expiryTimeValue),
				expiryViews: expiryViewsMap[expiryViews()](),
			});
			setSavingStatus(res.ok ? STATUS_SUCCESS : STATUS_FAILED);
			setLink(`/v/${id}#${key}`);
		} catch (err: any) {
			console.error(err);
			setSavingStatus(STATUS_FAILED);
		}
	};

	const onLogoClick = () => {
		const oldContent = paste();
		if (!oldContent) {
			return;
		}
		const confirmation = confirm(tr(locale(), ARE_YOU_SURE_CLEAR));
		if (confirmation) {
			setPaste("");
		}
	};

	return (
		<>
			<nav class="<lg:flex-wrap relative flex p-4 px-6">
				<div class="bg-dark-800 absolute top-0 left-0 h-full w-full opacity-80" />
				<Logo class="flex-1" onClick={onLogoClick} />
				{/* <div class="min-w-64 my-8 flex-1"></div> */}
				<div class="<lg:flex-col relative m-auto flex items-center">
					<div class="lg:pl-4">
						<p class="<lg:py-2 text-light-100">
							<InputRange
								min={0}
								max={7}
								value={expiryTime()}
								onChange={setExpiryTime}
							/>
							<span class="ml-2 inline-block w-56">
								{expiryTimeLabelMap(expiryTime())}
							</span>
						</p>
						<p class="<lg:py-2 text-light-100">
							<InputRange
								min={0}
								max={5}
								value={expiryViews()}
								onChange={setExpiryViews}
							/>
							<span class="ml-2 inline-block w-64">
								{expiryViewsLabelMap(expiryViews())}
							</span>
						</p>
					</div>
					<div class="relative mt-2 flex items-center text-blue-300 md:ml-4">
						<form onSubmit={onCreate} class="text-center">
							<p class="min-w-16 inline-block">
								<InputPassword value={password()} onChange={setPassword} />
							</p>
							<InputSubmit
								condition={savingStatus() === STATUS_SUBMITTING}
								colors={["green", "blue"]}
								labels={[
									<Spinner class="-mt-1 inline-block w-8" />,
									tr(locale(), CREATE),
								]}
							/>
						</form>
					</div>
				</div>
			</nav>
			<section class="relative flex flex-grow flex-col">
				<div
					class={`max-w-1/2 <lg:max-w-9/12 text-dark-900 ml-22 before:content-DEFAULT before:border-r-16 before:border-b-16 fixed top-24 left-2 z-20 inline-block break-all rounded-lg rounded-tl-none bg-blue-200 p-8 drop-shadow-lg transition-opacity before:absolute before:-top-4 before:left-0 before:h-0 before:w-0 before:border-r-transparent before:border-b-blue-200 ${
						savingStatus() === "" ? "opacity-0" : "opacity-100"
					}`}
				>
					{savingStatus() !== STATUS_SUCCESS ? (
						`${tr(locale(), savingStatus())}...`
					) : (
						<>
							<a
								href={`${window.location.origin}${link()}`}
								class="text-blue-600 underline hover:text-blue-500"
								target="_blank"
								rel="noreferrer"
							>{`${window.location.origin}${link()}`}</a>
							<button
								class={`text-light-100 mt-4 block w-full rounded-lg py-2 ${
									copied()
										? " text-dark-100 bg-green-400"
										: "bg-dark-400 text-light-100"
								}`}
								onClick={(e) => {
									const input = e.currentTarget.children[0] as HTMLInputElement;
									input.disabled = false;
									input.select();
									document.execCommand("copy", false);
									input.blur();
									input.disabled = true;
									setCopied(true);
									setTimeout(() => setCopied(false), 2000);
								}}
							>
								<textarea
									class="-top-1000 fixed"
									disabled
									value={`${window.location.origin}${link()}`}
								/>
								{copied() ? tr(locale(), COPIED) : tr(locale(), COPY)}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class={`inline-block ${
										copied() ? "fill-dark-100" : "fill-light-100 "
									}`}
									width="32"
									height="32"
									viewBox="0 0 24 24"
								>
									<path d="M 10.999512,3 C 9.8915144,3 9,3.891515 9,4.9995117 H 7.0004883 A 2,2 0 0 0 4.9995117,7.0004883 V 19.000488 A 2,2 0 0 0 7.0004883,21 h 9.9990237 a 2,2 0 0 0 2.000976,-1.999512 V 7.0004883 A 2,2 0 0 0 16.999512,4.9995117 H 15 C 15,3.891515 14.108485,3 13.000488,3 Z M 12,3.4995117 c 0.830998,0 1.5,0.6690016 1.5,1.5 0,0.8309984 -0.669002,1.5 -1.5,1.5 -0.830998,0 -1.5,-0.6690016 -1.5,-1.5 0,-0.8309984 0.669002,-1.5 1.5,-1.5 z M 9,7.0004883 h 6 c 1.107999,0 1.999512,0.6690008 1.999512,1.5 0,0.8309992 -0.891513,1.4999997 -1.999512,1.4999997 H 9 c -1.1079989,0 -1.9995117,-0.6690005 -1.9995117,-1.4999997 0,-0.8309992 0.8915128,-1.5 1.9995117,-1.5 z" />
								</svg>
							</button>
							<button
								class="absolute top-2 right-4 ml-4 text-xl"
								onClick={() => setSavingStatus("")}
							>
								×
							</button>
						</>
					)}
				</div>
				<div class="<lg:flex-wrap flex flex-1">
					<Editor
						onInput={setPaste}
						value={paste()}
						onLanguageSelected={setLanguage}
						language={language()}
					/>
				</div>
			</section>
		</>
	);
}
