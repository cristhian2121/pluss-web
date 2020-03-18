import React, { PureComponent } from 'react'

export class FiltersComponent extends PureComponent {

    constructor(props) {
        super(props)

        this.state = {
            formElements: []
        }
    }

    componentDidMount() {
        if (this.props.fields.length) {
            this.initializefilter(this.props.fields)
        }
    }

    initializefilter = (arrayForm) => {
        const formElements = []

        for (let item of arrayForm) {
            switch (item.type) {
                case 'input':
                    formElements.push(
                        this.renderInput(
                            item.id,
                            item.name,
                            item.placeHolder,
                            item.required,
                            item.regex
                        )
                    )
                    break;
                case 'select':
                    break;
                default:
                    break;
            }
        }
        this.setState({ formElements: formElements })
    }

    renderInput = (id, name, placeHolder, required = false, regex = false) => {
        console.log('placeHolder: ', placeHolder);
        return (
            // regex={regex}
            <input id={id} name={name} placeholder={placeHolder} required/>
        )
    }

    filterData = () => {
        const form = document.getElementById('formFielter')
        form.submit()
        this.state.formElements.forEach(item => {
            const element = document.getElementById(item.props.id)
            console.log('element: ', element.value);
             

        })
    }

    render() {
        return (
            <form id='formFielter'>
                {this.state.formElements.map(item => (
                    <div className={item.className ? item.className : ''}>
                        {item}
                    </div>
                ))}
                <br />
                <input type="button" value="Filtrar" onClick={this.filterData}/>
            </form>
        )
    }

}