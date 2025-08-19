export default function inputTemplate({
    params,
}: {
    params: {
        inputText: string;
        inputName: string;
        inputValue: string;
        inputType: string;
    };
}) {
    <div>
        <label>{params.inputText}</label>
        <input
            type={params.inputType}
            name={params.inputName}
            value={params.inputValue}
            required
            accept={
                params.inputType === "file"
                    ? "image/png, image/jpeg, image/jpg"
                    : undefined
            }
        />
    </div>;
}
