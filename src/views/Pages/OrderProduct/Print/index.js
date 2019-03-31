import React from "react";
import {connect} from "react-redux";

var Barcode = require('react-barcode');

class ComponentToPrint extends React.Component {
    render() {
        const {
            receiver_client,
            sender_client,
            serial_code,
            delivery,
            receiver_region,
            sender_region,
            sender_phone,
            receiver_phone,
            receiver_organization,
            quantity
        } = this.props

        return (
            <div className={'print-container'}>
                <table className="table table-bordered print-table">
                    <thead>
                    <tr>
                        <th colSpan={2}>
                            <p><img
                                src={require('../../../../assets/img/logo/logo.png')}
                                className={'logo-print'}
                            />
                            FLY MAIL SERVIS</p></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td colSpan={2}>
                            <Barcode
                                width={1}
                                height={20}
                                margin={0}
                                padding={0}
                                fontSize={8}
                                value={serial_code ? serial_code : '123456789'}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{padding: 0, margin: 0}} >
                            <p className={'title-text'}>Phone number</p>
                            <p>23483247234234234</p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{padding: 0, margin: 0}} >
                            <p className={'title-text'}>DESTINATION:</p>
                            <p style={{
                                float: 'right',
                                padding: 0,
                                margin: '0 5 5 0'
                            }}>{receiver_region}</p>
                        </td>
                        <td style={{padding: 0, margin: 0}} >
                            <p className={'title-text'}>QUANTITY:</p>
                            <p>{quantity} <span style={{textTransform: 'uppercase', fontSize: 10}}>psc</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td style={{padding: 0, margin: 0}} >
                            <p className={'title-text'}>FROM:</p>
                            <p style={{
                                float: 'right',
                                padding: 0,
                                margin: '0 5 5 0'
                            }}>{sender_region}</p>
                        </td>
                        <td style={{padding: 0, margin: 0}} >
                            <p className={'title-text'}>TOTAL WEIGHT:</p>
                            <p>001 <span style={{textTransform: 'uppercase', fontSize: 10}}>psc</span></p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}  style={{padding: 0, margin: 0}}>
                            <p className={'title-text'}>OPTIONAL INF</p>
                            <p style={{
                                fontSize: 12
                            }}>TASHKENT AIRPORT CARGO</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default connect()(ComponentToPrint)