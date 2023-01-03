const ALGORITHM = "AES-GCM";
const ALGORITHM_SHORT = "A256GCM";
const ALGORITHM_LENGTH = 256;
const HASH_ALGORITHM = "SHA-256";
const HASH_ITERATION = 100000;
const TAG_LENGTH = 128;

export const toB64 = (data: Uint8Array): Promise<string> =>
	new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.readAsDataURL(new Blob([data]));
	}).then((url: string) => url.split(",", 2)[1]);

export const fromB64 = (data: string): Uint8Array =>
	new Uint8Array(
		atob(data)
			.split("")
			.map((c) => c.charCodeAt(0)),
	);

export const getId = (): string => window.crypto.randomUUID();

export const generatePasswordKey = async (
	password: string,
	salt: Uint8Array,
): Promise<CryptoKey> => {
	const importedPassword = await window.crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		{ name: "PBKDF2" },
		!"exportable",
		["deriveKey"],
	);
	return window.crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: HASH_ITERATION,
			hash: HASH_ALGORITHM,
		},
		importedPassword,
		{
			name: ALGORITHM,
			length: ALGORITHM_LENGTH,
		},
		!"exportable",
		["encrypt", "decrypt"],
	);
};

export const encrypt = async (
	data: string,
	password?: string,
): Promise<{ content: string; key: string }> => {
	const primaryKey = await window.crypto.subtle.generateKey(
		{
			name: ALGORITHM,
			length: ALGORITHM_LENGTH,
		},
		Boolean("exportable"),
		["encrypt", "decrypt"],
	);
	const exportedKey = await window.crypto.subtle.exportKey("jwk", primaryKey);
	const keys = [exportedKey.k];
	const ivs = [window.crypto.getRandomValues(new Uint8Array(16))];

	let input = new TextEncoder().encode(data);

	if (password) {
		const salt = window.crypto.getRandomValues(new Uint8Array(16));
		keys.push(await toB64(salt));
		ivs.push(window.crypto.getRandomValues(new Uint8Array(16)));
		const passwordKey = await generatePasswordKey(password, salt);
		input = new Uint8Array(
			await window.crypto.subtle.encrypt(
				{
					name: ALGORITHM,
					iv: ivs[1],
					tagLength: TAG_LENGTH,
				},
				passwordKey,
				input,
			),
		);
	}
	const encrypted = await window.crypto.subtle.encrypt(
		{
			name: ALGORITHM,
			iv: ivs[0],
			tagLength: TAG_LENGTH,
		},
		primaryKey,
		input,
	);
	const content = (
		await Promise.all([new Uint8Array(encrypted), ...ivs].map(toB64))
	).join("\n");
	const key = keys.join("|");
	return { content, key };
};

export const decrypt = async (
	content: string,
	key: string,
	password?: string,
): Promise<string> => {
	const keys = key.split("|");
	const [input, ...ivs] = content.split("\n").map(fromB64);
	const importedKey = await window.crypto.subtle.importKey(
		"jwk",
		{
			alg: ALGORITHM_SHORT,
			ext: true,
			k: keys[0],
			key_ops: ["encrypt", "decrypt"],
			kty: "oct",
		},
		{
			name: ALGORITHM,
		},
		false,
		["encrypt", "decrypt"],
	);

	let decrypted = await window.crypto.subtle.decrypt(
		{
			name: ALGORITHM,
			iv: ivs[0],
			tagLength: TAG_LENGTH,
		},
		importedKey,
		input,
	);

	if (keys.length === 2) {
		const salt = fromB64(keys[1]);
		const passwordKey = await generatePasswordKey(password, salt);

		decrypted = await window.crypto.subtle.decrypt(
			{
				name: ALGORITHM,
				iv: ivs[1],
				tagLength: TAG_LENGTH,
			},
			passwordKey,
			decrypted,
		);
	}

	return new TextDecoder().decode(decrypted);
};
