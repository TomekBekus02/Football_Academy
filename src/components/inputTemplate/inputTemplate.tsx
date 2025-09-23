import inputLayout from "./inputTemplate.module.css";

type inputTemplateType = {
    inputText: string;
    inputName: string;
    inputValue: string;
    inputType: string;
};

export default function InputTemplate({
    inputText,
    inputName,
    inputValue,
    inputType,
    ...rest
}: inputTemplateType) {
    return (
        <div className={inputLayout.inputGroup}>
            <input
                type={inputType}
                name={inputName}
                defaultValue={inputValue}
                {...rest}
            />
            <label>{inputText}</label>
        </div>
    );
}
