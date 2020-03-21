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

    renderInput = (id, name, placeHolder, regex = false) => {
        console.log('placeHolder: ', placeHolder);
        return (
            // regex={regex}
            <input id={id} name={name} placeholder={placeHolder} />
        )
    }

    filterData = async () => {
        let data = this.props.data
        for (let item of this.state.formElements) {
            const element = document.getElementById(item.props.id)
            if (element.value) {
                if (this.props.external) {
                    data = await this.filterExternal(element.name, element.value)
                } else {
                    data = data.filter(item => {
                        let product = item[element.name] || ''
                        let characteristic = product.toString()
                        characteristic = characteristic.toLowerCase()
                        return characteristic == element.value.toLowerCase()
                    })
                }
                console.log('data filtered: ', data);
            }
        }
        this.props.dataFiltered(data)
    }

    filterExternal = async (elementName, elementValue) => {
        const field = this.props.fields.find(_ => _.name == elementName)
        let data;
        if (field.query) {
            try {
                const rawResponse = await fetch(field.query.replace(`_${elementName}`, elementValue))
                data = await rawResponse.json();
            }
            catch (error) {
                // this.buildResponseError(error)
                console.log('error', error)
            }
            console.log('rowData: ', data);
        }
        return data
    }

    clearFilters = () => {
        const form = document.getElementById('formFielter')
        form.reset()
        this.props.dataFiltered(this.props.data)
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
                <p><input type="button" value="Filtrar" onClick={this.filterData} /></p>
                <p><input type="button" value="Limpiar filtros" onClick={this.clearFilters} /></p>
            </form>
        )
    }

}