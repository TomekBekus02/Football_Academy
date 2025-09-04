export const extractPlayerName = (selectElement: HTMLSelectElement) => {
    const selectedOption = selectElement.selectedOptions[0];
    if (!selectedOption) return "";
    return selectedOption.text.replace(/^\d+\. /, "");
};
