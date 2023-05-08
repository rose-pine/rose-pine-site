import { atom } from "nanostores";

const pathname = atom("/");
const queryTheme = atom("");
const searchIsOpen = atom(false);

function makeStorage() {
	type Storage = {
		decorations: boolean;
	};

	function getSafeStorage(key: string, dictionary: string[]): string {
		if (typeof localStorage === "undefined") {
			return dictionary[0];
		}

		const value = localStorage.getItem(key) ?? "";

		return dictionary.includes(value) ? value : dictionary[0];
	}

	function setSafeStorage(key: string, value: string) {
		if (typeof localStorage === "undefined") {
			return;
		}

		localStorage.setItem(key, value);
	}

	const { subscribe, set } = atom<Storage>({
		decorations: getSafeStorage("color-decorations", ["on", "off"]) === "on",
	});

	return {
		subscribe,
		set: (storage: Storage) => {
			setSafeStorage("color-decorations", storage.decorations ? "on" : "off");
			set(storage);
		},
		get: () => ({
			decorations: getSafeStorage("color-decorations", ["on", "off"]) === "on",
		}),
	};
}

const storage = makeStorage();

function makeClipboard() {
	const { subscribe, set } = atom({ content: "", position: "" });
	let timeoutId: number;

	return {
		subscribe,
		copy: (content: string, position = "") => {
			if (typeof navigator === "undefined") {
				return;
			}

			navigator.clipboard
				.writeText(content)
				.then(() => set({ content, position }));

			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				set({ content: "", position: "" });
			}, 600);
		},
	};
}

const clipboard = makeClipboard();

export { pathname, queryTheme, searchIsOpen, storage, clipboard };
