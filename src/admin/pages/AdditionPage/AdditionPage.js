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
import {addPackageList, getPackageList} from "../../common/actions/PackageActions";
import Card from "../../components/Card/Card";
import {addAdditionList, getAdditionList} from "../../common/actions/AdditionActions";

class AdditionPage extends Component {
    state = {
        regionList: [],
        show: false,

        deliverInside: "",
        deliverOutside: "",
        takenInside: "",
        takenOutside: "",
        editingDeliverInside: "",
        editingDeliverOutside: "",
        editingTakenInside: "",
        editingTakenOutside: "",
        editingAdditionID: "",

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
            loadingData: true
        });

        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/addition/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({
                            loadingData: false,
                            regionList: response.data
                        });
                        console.log("response.data", response.data);
                        this.props.getAdditionList(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getPackageList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/addition/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data});
                        console.log("response.data", response.data)
                        this.props.getAdditionList(response.data);
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

        axios.get(`${URL}/api/invoice/package/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addPackageList(response.data.results)
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
        this.props.getAdditionList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            deliverInside: "",
            deliverOutside: "",
            takenInside: "",
            takenOutside: "",
        });
        this.setState({error: false})
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editPackageInfo = (pack, id) => {
        this.setState({
            editingDeliverInside: pack.to_be_delivered_to_inside_city,
            editingDeliverOutside: pack.to_be_delivered_to_outside_city,
            editingTakenInside: pack.to_be_taken_from_inside_city,
            editingTakenOutside: pack.to_be_taken_from_outside_city,
            editingAdditionID: id
        });

        console.log(pack);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/invoice/addition/update/${this.state.editingAdditionID}`, {
                to_be_taken_from_inside_city: this.state.editingTakenInside,
                to_be_taken_from_outside_city: this.state.editingTakenOutside,
                to_be_delivered_to_inside_city: this.state.editingDeliverInside,
                to_be_delivered_to_outside_city: this.state.editingDeliverOutside
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getPackageList()
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
                    <h2>Addition</h2>
                </div>
                <Card>
                    {this.state.loadingData ?
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <MDSpinner size="35"/>
                        </div>
                        :
                        <Table striped bordered hover responsive size="lg">
                            <thead className="employee-table">
                            <tr >
                                <th style={{color: "#000"}}>Вызов курьера (Внутри города)</th>
                                <th style={{color: "#000"}}>Вызов курьера (Вне города)</th>
                                <th style={{color: "#000"}}>Доставка (Внутри города)</th>
                                <th style={{color: "#000"}}>Доставка (Вне города)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.additionList && this.props.additionList.map((pack, id) => {
                                return (
                                    <tr key={id}>
                                        <td >{pack.to_be_taken_from_inside_city}</td>
                                        <td>{pack.to_be_taken_from_outside_city}</td>
                                        <td>{pack.to_be_delivered_to_inside_city}</td>
                                        <td>{pack.to_be_delivered_to_outside_city}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editPackageInfo(pack, pack.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
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
                {/*{this.state.hasMore ?  (this.state.loadingItems ?*/}
                        {/*<Button*/}
                            {/*variant="primary"*/}
                            {/*style={{marginTop: "15px"}}*/}
                        {/*><MDSpinner size="17"/></Button>*/}
                        {/*:*/}
                        {/*<Button*/}
                            {/*variant="primary"*/}
                            {/*style={{marginTop: "15px"}}*/}
                            {/*onClick={() => this.loadMoreItems()}*/}
                        {/*>Показать больше</Button>*/}
                {/*) : null}*/}

                <Modal show={this.state.showStatusModal} onHide={this.closeStatusModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать детали</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Вызов курьера (Внутри города)</ControlLabel>
                            <FormControl
                                value={this.state.editingTakenInside}
                                onChange={(e)=>this.setState({editingTakenInside: e.target.value})}
                                label="Вызов курьера (Внутри города)"
                                type="text"
                                bsClass="form-control"
                                placeholder="Вызов курьера (Внутри города)"
                            />
                            <ControlLabel>Вызов курьера (Вне города)</ControlLabel>
                            <FormControl
                                value={this.state.editingTakenOutside}
                                onChange={(e)=>this.setState({editingTakenOutside: e.target.value})}
                                label="Вызов курьера (Вне города)"
                                type="text"
                                bsClass="form-control"
                                placeholder="Вызов курьера (Вне города)"
                            />
                            <ControlLabel>Доставка (Внутри города)</ControlLabel>
                            <FormControl
                                value={this.state.editingDeliverInside}
                                onChange={(e)=>this.setState({editingDeliverInside: e.target.value})}
                                label="Доставка (Внутри города)"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Доставка (Внутри города)"
                            />
                            <ControlLabel>Доставка (Внe города)</ControlLabel>
                            <FormControl
                                value={this.state.editingDeliverOutside}
                                onChange={(e)=>this.setState({editingDeliverOutside: e.target.value})}
                                label="Доставка (Внe города)"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Доставка (Внe города)"
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
        additionList: state.addition.additionList,
    }),
    (dispatch) => ({
        getAdditionList: (packages) => dispatch(getAdditionList(packages)),
        addAdditionList: (packages) => dispatch(addAdditionList(packages))
    })
)(AdditionPage));