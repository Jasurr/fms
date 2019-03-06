import React from 'react';
import {ControlLabel, FormControl, FormGroup,} from 'react-bootstrap';

import {connect} from 'react-redux';
import {Field, formValueSelector, reduxForm} from 'redux-form';
import {Routines} from 'common/api';

import {Card} from 'components/Card/Card.jsx';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class EditOrderProduct extends React.Component {
    fieldProps = [
        {
            label: 'ID',
            type: 'text',
            placeholder: 'Enter order product ID',
            value: this.props.id,
            name: 'id',
            component: this.renderInputField
        },
        {
            label: 'Local Product ID',
            type: 'localProductId',
            placeholder: 'Enter Local product ID',
            value: this.props.localProductId,
            name: 'localProductId',
            component: this.renderInputField
        },
        {
            label: 'URL product ID',
            type: 'text',
            placeholder: 'Enter URL product ID',
            value: this.props.urlProductId,
            name: 'urlProductId',
            component: this.renderInputField
        },
        {
            label: 'Forwarding product ID',
            type: 'text',
            placeholder: 'Enter forwarding product ID',
            value: this.props.forwardingProductId,
            name: 'forwardingProductId',
            component: this.renderInputField
        },
        {
            label: 'Quantity',
            type: 'text',
            placeholder: 'Enter quantity',
            value: this.props.quantity,
            name: 'quantity',
            component: this.renderInputField
        },
        {
            label: 'Order',
            type: 'text',
            placeholder: 'Enter order',
            value: this.props.order,
            name: 'order',
            component: this.renderInputField
        }
    ];

    renderInputField(field) {
        return (
            <FormGroup>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    {...field.input}
                />
            </FormGroup>
        );
    }

    onSubmit(values) {
        const {
            id,
            localProductId,
            urlProductId,
            forwardingProductId,
            quantity,
            order
        } = this.props;
        Routines.admin.putOrderProductUpdate(
            {
                request: {
                    id,
                    local_product_id: localProductId || null,
                    urlProductId: urlProductId || null,
                    forwardingProductId: forwardingProductId || null,
                    quantity,
                    order
                }
            },
            this.props.dispatch
        );
    }

    render() {

        const {} = this.props.initialValues
        return (
            <div>
                <Card
                    title="Arrived"
                    content={
                        <form
                            onSubmit={this.props.handleSubmit(event => this.onSubmit(event))}
                        >
                            <Field
                                label={'ID'}
                                type="text"
                                name={'id'}
                                component={this.renderInputField}
                            />
                            <Field
                                label={'Weight'}
                                type="number"
                                name={'weight'}
                                component={this.renderInputField}
                            />
                            <Field
                                label={'Price'}
                                type="number"
                                name={'price'}
                                component={this.renderInputField}
                            />

                            <Button bsStyle="info" pullRight fill type="submit">
                                Submit
                            </Button>
                            <div className="clearfix"/>
                        </form>
                    }
                />
            </div>
        );
    }
}

EditOrderProduct = reduxForm({
    form: 'EditOrderProduct'
})(EditOrderProduct);

const selector = formValueSelector('EditOrderProduct');

const mapsPropsToState = (state, ownProps) => {
    const {id, url_product_id, weight, local_product_id, forwarding_product_id} = ownProps.formFields
    const {price} = url_product_id || local_product_id || forwarding_product_id
    return {
        initialValues: {
            id: id | "",
            weight: weight | "",
            price: price | ""
        }
    };
}


export default connect(mapsPropsToState)(EditOrderProduct);
