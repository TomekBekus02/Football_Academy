import inputLayout from "@/components/inputTemplate/inputTemplate.module.css";

type InputTemplateProps = React.InputHTMLAttributes<HTMLInputElement> & {
    inputText: string;
};

export default function InputTemplate({
    inputText,
    ...rest
}: InputTemplateProps) {
    return (
        <div className={inputLayout.inputGroup}>
            <input {...rest} />
            <label>{inputText}</label>
        </div>
    );
}
