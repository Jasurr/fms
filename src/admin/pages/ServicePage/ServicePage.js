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
import {addServiceList, getServiceList} from "../../common/actions/ServiceActions";

class ServicePage extends Component {
    state = {
        regionList: [],
        show: false,

        editingName: "",
        editingPassport: "",
        editingQuantity: "",
        editingServiceID: "",

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
        this.setState({error: false})
        this.setState({loadingItems: false});
        this.setState({loadingSaveEdit: false,
            loadingData: true});

        if (this._isMounted) {
            axios.get(`${URL}/api/service/delivery/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({regionList: response.data.results,
                            loadingData: false});
                        console.log("response.data", response.data);
                        this.props.getServiceList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getServiceList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/service/delivery/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({serviceList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getServiceList(response.data.results);
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

        axios.get(`${URL}/api/service/delivery/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addServiceList(response.data.results)
            })
            .catch((error) => {
                this.setState({loadingItems: false});
                this.setState({hasMore: false});
                console.log('error 3 ' + error.status);
            });
    };

    componentWillUnmount() {
        this._isMounted = false;
        this.setState({showSpinner: false});
        this.setState({error: false});
        this.props.getServiceList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            title: "",
            length: "",
            width: "",
            height: "",
            weight: "",
            quantity: ""
        });
        this.setState({error: false})
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    };

    deleteService = (serviceID) => {
        console.log("serviceID ", serviceID)

        axios.delete(`${URL}/api/service/delivery/delete/${serviceID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getServiceList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editServiceInfo = (pack, id) => {
        this.setState({
            editingName: pack.full_name,
            editingPassport: pack.serial_number,
            editingQuantity: pack.quantity,
            editingServiceID: id,
        });

        console.log(pack);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/service/delivery/update/${this.state.editingServiceID}`, {
                full_name: this.state.editingName,
                serial_number: this.state.editingPassport,
                quantity: this.state.editingQuantity,
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getServiceList()
            })
            .catch((error) => {
                this.setState({loadingSaveEdit: false})
                console.log(error.response);
            });
    };


    render() {
        return (
            <div style={{padding: "25px"}}>
                <div>
                    <h2>Доставка</h2>
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
                                <th>ID</th>
                                <th>Ф.И.О.</th>
                                <th>Паспорт</th>
                                <th>Количество</th>
                                <th>Дата создания</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.serviceList && this.props.serviceList.map((pack, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{pack.id}</td>
                                        <td>{pack.full_name}</td>
                                        <td>{pack.serial_number}</td>
                                        <td>{pack.quantity}</td>
                                        <td>{pack.created}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editServiceInfo(pack, pack.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteService(pack.id)}
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

                <Modal show={this.state.showStatusModal} onHide={this.closeStatusModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать детали</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Ф.И.О.</ControlLabel>
                            <FormControl
                                value={this.state.editingName}
                                onChange={(e)=>this.setState({editingName: e.target.value})}
                                label="Ф.И.О."
                                type="text"
                                bsClass="form-control"
                                placeholder="Ф.И.О."
                            />
                            <ControlLabel>Паспорт</ControlLabel>
                            <FormControl
                                value={this.state.editingPassport}
                                onChange={(e)=>this.setState({editingPassport: e.target.value})}
                                label="Паспорт"
                                type="text"
                                bsClass="form-control"
                                placeholder="Паспорт"
                            />
                            <ControlLabel>Количество</ControlLabel>
                            <FormControl
                                value={this.state.editingQuantity}
                                onChange={(e)=>this.setState({editingQuantity: e.target.value})}
                                label="Количество"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Количество"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeStatusModal}>
                            Закрыть
                        </Button>
                        {this.state.loadingSaveEdit ?
                            <Button variant="primary">
                                <MDSpinner size="17" />
                            </Button>
                            :
                            <Button variant="primary" onClick={() => this.saveStatus()}>
                                Сохранить
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }
}


export default withRouter(connect(
    (state) => ({
        serviceList: state.service.serviceList,
    }),
    (dispatch) => ({
        getServiceList: (service) => dispatch(getServiceList(service)),
        addServiceList: (service) => dispatch(addServiceList(service))
    })
)(ServicePage));