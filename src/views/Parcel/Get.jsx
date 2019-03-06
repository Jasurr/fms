import React from 'react';
import { connect } from 'react-redux';
import { Routines } from 'common/api';

import { Table, Modal } from 'react-bootstrap';
import Card from 'components/Card/Card.jsx';
import Button from 'components/CustomButton/CustomButton.jsx';

import Edit from './Edit';

class getParcel extends React.Component {
	state = {
		modalIsVisible: false,
		modalProps: []
	};

	data = this.props.data[this.props.type];

	componentWillMount() {
		this.getParcelList();
	}

	getParcelList = () => {
		Routines.admin.getParcelList(
			{
				request: { status: this.props.status }
			},
			this.props.dispatch
		);
	};

	render() {
		return (
			<div className="content">
				<Modal
					onHide={() => this.setState({ modalIsVisible: false })}
					show={this.state.modalIsVisible}
				>
					<Edit formFields={this.state.modalProps} />
				</Modal>
				<Button onClick={this.getParcelList} bsStyle="info" fill pullRight>
					Update
				</Button>
				<Card
					// plain
					title={this.props.title}
					category="Here is a subtitle for this table"
					ctTableFullWidth
					ctTableResponsive
					content={
						<Table hover>
							<thead>
								<tr>
									{this.props.headers.map((prop, key) => {
										return <th key={key}>{prop}</th>;
									})}
								</tr>
							</thead>
							<tbody>
								{this.data &&
									this.data.map((product, key) => {
										// console.log(product);
										return (
											<tr key={key}>
												{Object.keys(product).map(
													(colName, colId) =>
														this.props.headers.includes(colName) ? (
															<td key={colId}>{product[colName]}</td>
														) : null
												)}
												<td>
													<Button
														onClick={() =>
															this.setState({
																modalIsVisible: true,
																modalProps: product.headers
															})
														}
														pullRight
													>
														Edit
													</Button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</Table>
					}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		data: state.parcel.parcelList
	};
};

export default connect(mapStateToProps)(getParcel);
