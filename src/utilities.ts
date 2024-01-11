export const getLocaleAndPath = (id: string) => {
	const separatorPosition = [...id].findIndex((char) => char === "/");
	const locale = id.substring(0, separatorPosition);
	const path = id.substring(separatorPosition + 1, id.length - 3);

	return { locale, path };
};
