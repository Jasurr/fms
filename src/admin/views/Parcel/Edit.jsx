import React, { Component } from 'react';
import {
	Grid,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap';

import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { Routines } from 'common/api';

import { Card } from 'components/Card/Card.jsx';
import { FormInputs } from 'components/FormInputs/FormInputs.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

class EditParcel extends React.Component {
	fieldProps = [
		{
			label: 'ID',
			type: 'text',
			placeholder: 'Enter parcel ID',
			value: this.props.id,
			name: 'id',
			component: this.renderInputField
		},
		{
			label: 'User ID',
			type: 'text',
			placeholder: 'Enter user ID',
			value: this.props.user_id,
			name: 'user_id',
			component: this.renderInputField
		},
		{
			label: 'Payment',
			type: 'text',
			placeholder: 'Enter payment',
			value: this.props.payment,
			name: 'payment',
			component: this.renderInputField
		},
		{
			label: 'Address',
			type: 'text',
			placeholder: 'Enter address',
			value: this.props.address,
			name: 'address',
			component: this.renderInputField
		},
		{
			label: 'Paid',
			type: 'text',
			placeholder: 'Enter paid',
			value: this.props.paid,
			name: 'paid',
			component: this.renderInputField
		},
		{
			label: 'Status',
			type: 'text',
			placeholder: 'Enter status',
			value: this.props.status,
			name: 'status',
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
		const { id, user_id, payment, address, paid, status } = this.props;
		Routines.admin.putParcelUpdate(
			{
				request: {
					id,
					user_id,
					payment,
					address,
					paid,
					status
				}
			},
			this.props.dispatch
		);
	}

	render() {
		return (
			<div>
				<Card
					title="Edit"
					content={
						<form
							onSubmit={this.props.handleSubmit(event => this.onSubmit(event))}
						>
							{this.fieldProps.map((field, id) => (
								<Field
									key={id}
									label={field.label}
									type={field.type}
									placeholder={field.placeholder}
									value={field.value}
									name={field.name}
									component={field.component}
								/>
							))}
							<Button bsStyle="info" pullRight fill type="submit">
								Submit
							</Button>
							<div className="clearfix" />
						</form>
					}
				/>
			</div>
		);
	}
}

EditParcel = reduxForm({
	form: 'EditParcel'
})(EditParcel);

const selector = formValueSelector('EditParcel');

EditParcel = connect(state => {
	const { id, user_id, payment, address, paid, status } = selector(
		state,
		'id',
		'user_id',
		'payment',
		'address',
		'paid',
		'status'
	);
	return {
		id: id || state.parcel.edit.id,
		user_id: user_id || state.parcel.edituser_id,
		payment: payment || state.parcel.editpayment,
		address: address || state.parcel.editaddress,
		paid: paid || state.parcel.editpaid,
		status: status || state.parcel.editstatus
	};
})(EditParcel);

export default EditParcel;
