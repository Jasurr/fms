import React, {Component} from 'react';
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip
} from "react-bootstrap";
import axios from "axios";
import MDSpinner from "react-md-spinner";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {TOKEN, URL} from '../../common/config/url';
import Card from "../../components/Card/Card";
import {addInvoiceList, getInvoiceList} from "../../common/actions/InvoiceActions";

class InvoicePage extends Component {
    state = {
        invoiceList: [],
        show: false,
        title: "",
        short: "",
        showSpinner: false,
        page: 2,
        hasMore: false,
        loadingItems: false,
        error: false,
        toggleActive: false,
        showStatusModal: false,
        staffToggle: true,
        loadingSaveEdit: false,
        loadingData: false
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            error: false,
            loadingItems: false,
            loadingSaveEdit: false,
            loadingData: true
        });

        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({
                            invoiceList: response.data.results,
                            loadingData: false
                        });
                        console.log("response.data", response.data);
                        this.props.getInvoiceList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getInvoiceList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({invoiceList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getInvoiceList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    };

    loadMoreItems = () => {
        const page = this.state.page;
        console.log("this.state.page ", this.state.page);

        this.setState({loadingItems: true});

        axios.get(`${URL}/api/invoice/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addInvoiceList(response.data.results)
            })
            .catch((error) => {
                this.setState({loadingItems: false});
                this.setState({hasMore: false});
                console.log('error 3 ' + error.status);
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({
            showSpinner: false,
            error: false
        })
        this.props.getInvoiceList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            title: "",
            short: "",
        });
        this.setState({error: false})
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    };

    deleteInvoice = (invoiceID) => {
        console.log("invoiceID ", invoiceID)

        axios.delete(`${URL}/api/invoice/delete/${invoiceID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getInvoiceList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };


    render() {
        return (
            <div style={{padding: "25px"}}>
                <div>
                    <h2>Накладные</h2>
                </div>
                <Card>
                    {this.state.loadingData ?
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <MDSpinner size="35"/>
                        </div>
                        :
                        <Table striped bordered hover responsive size="lg">
                            <thead className="employee-table">
                            <tr>
                                <th>№</th>
                                <th>ID</th>
                                <th>Ф.И.О</th>
                                <th>Организация</th>
                                <th>Регион</th>
                                <th>Город</th>
                                <th>Почта</th>
                                <th>Номер тел</th>
                                <th>Серийный номер</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.invoiceList && this.props.invoiceList.map((invoice, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{invoice.id}</td>
                                        <td>{invoice.sender_f_l_m}</td>
                                        <td>{invoice.sender_organization}</td>
                                        <td>{invoice.sender_region}</td>
                                        <td>{invoice.sender_city}</td>
                                        <td>{invoice.sender_email}</td>
                                        <td>{invoice.sender_phone}</td>
                                        <td>{invoice.serial_code}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteInvoice(invoice.id)}
                                                    bsStyle="danger"
                                                    bsSize="xs">
                                                    <i className="fa fa-times"/>
                                                </Button>
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </Table>
                    }
                </Card>
                {this.state.hasMore ?  (this.state.loadingItems ?
                        <Button
                            variant="primary"
                            style={{marginTop: "15px"}}
                        ><MDSpinner size="17"/></Button>
                        :
                        <Button
                            variant="primary"
                            style={{marginTop: "15px"}}
                            onClick={() => this.loadMoreItems()}
                        >Показать больше</Button>
                ) : null}
            </div>
        );
    }
}


export default withRouter(connect(
    (state) => ({
        invoiceList: state.invoice.invoiceList,
    }),
    (dispatch) => ({
        getInvoiceList: (invoices) => dispatch(getInvoiceList(invoices)),
        addInvoiceList: (invoices) => dispatch(addInvoiceList(invoices))
    })
)(InvoicePage));