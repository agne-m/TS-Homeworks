type SelectOption = {
    label: string
    value: string,
};

type SelectFieldProps = {
    label: string,
    options: SelectOption[],
    onChange: (value: string) => void;
}

class SelectField {
    private static count: number = 0;

    private readonly id: string;

    private props: SelectFieldProps;

    public htmlElement: HTMLDivElement

    constructor(props: SelectFieldProps) {
        SelectField.count += 1
        this.id = `SelectField-${SelectField.count}`
        this.props = props;
        this.htmlElement = document.createElement('div');
        console.log(this.props);
        console.log(this.id);


        this.initialize();
    }

    private initialize = (): void => {
        const { label, options, onChange } = this. props;

        const labelHtmlElement = document.createElement('label')
        labelHtmlElement.innerHTML = `${label}`
        labelHtmlElement.className = 'mb-1'
        labelHtmlElement.setAttribute('for', 'this.id');

        const optionsHtmlString = options
            .map((option) => `<option value="${option.value}">${option.label}</option>`)
            .join('')

        const selectHtmlElement = document.createElement('select')
        selectHtmlElement.className = 'form-select'
        selectHtmlElement.id = 'this.id'
        selectHtmlElement.innerHTML = optionsHtmlString;
        selectHtmlElement.addEventListener('change', () => onChange(selectHtmlElement.value));

        this.htmlElement.className = 'mb-4'
        this.htmlElement.append(
            labelHtmlElement,
            selectHtmlElement
        );


    }
}

export default SelectField;