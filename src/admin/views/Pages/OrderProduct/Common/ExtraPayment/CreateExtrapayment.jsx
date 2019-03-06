import React from "react";

import {Row, Col, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import {connect} from "react-redux";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {Routines, Exception} from "common/api";
import ImageUploader from 'react-images-upload';
import {Card} from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Loading from "components/Loading/index";

class CreateExtraPayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {pictures: []};
        this.onDrop = this.onDrop.bind(this);
    }


    renderInputField(field) {
        return (
            <div style={{marginBottom: 10}}>
                <FormGroup>
                    <ControlLabel>{field.label}</ControlLabel>
                    <FormControl
                        placeholder={field.placeholder}
                        type={field.type}
                        value={field.value}
                        componentClass={field.componentClass}
                        {...field.input}
                    />
                </FormGroup>
            </div>
        );
    }


    onSubmit(event) {
        event.preventDefault();
        const {dispatch, reset} = this.props
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

        // console.log(this.state.pictures)
        return sleep(1000).then(() => {
            this.props.handleSubmit((values) => {
                // console.log(values)
                const {order_product, description, photo, price} = values
                const {pictures} = this.state
                Routines.admin.postCreateExtraPayment(
                    {
                        request: {
                            order_product,
                            description,
                            photo: null,
                            price,
                        }
                    },
                    dispatch
                ).then(() => {
                    reset()
                    this.props.close()
                })
                    .catch(err => console.log('Error ', err))

            })()
        })

    }

    onDrop = (picture) => {

        this.setState({
            pictures: picture,
        });
    }

    render() {
        const {processing, order_product_id, price} = this.props

        return (
            <div>
                <Row>
                    <Col md={12}>
                        <Card
                            title="Create"
                            content={
                                <form
                                    onSubmit={this.onSubmit.bind(this)}
                                >
                                    <Field
                                        label={'Order product id'}
                                        placeholder={order_product_id}
                                        name={'id'}
                                        component={this.renderInputField}
                                    />
                                    <Field
                                        label={'Description'}
                                        placeholder={'Enter your text'}
                                        componentClass={'textarea'}
                                        name={'description'}
                                        component={this.renderInputField}
                                    />
                                    <Field
                                        label={'Price'}
                                        placeholder={price}
                                        name={'price'}
                                        component={this.renderInputField}
                                    />
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                    <Button bsStyle="info" pullRight fill type="submit">
                                        Submit
                                    </Button>
                                    <div className="clearfix"/>

                                </form>
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

CreateExtraPayment = reduxForm({
    form: "CreateExtraPayment"
})(CreateExtraPayment);

const mapsPropsToState = (state, ownProps) => {
    const {id, forwarding_product_id, local_product_id, url_product_id} = ownProps.formFields
    const {price} = forwarding_product_id || local_product_id || url_product_id

    return {
        initialValues: {
            id: id | '',
            price: price | '',
            description: ''
        }
    }
}

export default connect(mapsPropsToState)(CreateExtraPayment);
