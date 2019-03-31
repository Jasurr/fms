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

class PackagePage extends Component {
    state = {
        regionList: [],
        show: false,

        title: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        quantity: "",
        editingTitle: "",
        editingLength: "",
        editingWidth: "",
        editingHeight: "",
        editingWeight: "",
        editingQuantity: "",
        editingPackageID: "",
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
            axios.get(`${URL}/api/invoice/package/list`,
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
                        this.props.getPackageList(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getPackageList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/package/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data});
                        console.log("response.data", response.data)
                        this.props.getPackageList(response.data);
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
        this.props.getPackageList()
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

    deletePackage = (packageID) => {
        console.log("regionID ", packageID)

        axios.delete(`${URL}/api/invoice/package/delete/${packageID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getPackageList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editPackageInfo = (pack, id) => {
        this.setState({
            editingTitle: pack.title,
            editingLength: pack.length,
            editingWidth: pack.width,
            editingHeight: pack.height,
            editingWeight: pack.weight,
            editingQuantity: pack.quantity,
            editingPackageID: id,
        });

        console.log(pack);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/invoice/package/update/${this.state.editingPackageID}`, {
                title: this.state.editingTitle,
                length: this.state.editingLength,
                width: this.state.editingWidth,
                height: this.state.editingHeight,
                weight: this.state.editingWeight,
                quantity: this.state.editingQuantity
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
                    <h2>Упаковка</h2>
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
                                <th style={{color: "#000"}} >ID</th>
                                <th style={{color: "#000"}} >Наименование</th>
                                <th style={{color: "#000"}} >Длинна</th>
                                <th style={{color: "#000"}} >Ширина</th>
                                <th style={{color: "#000"}} >Высота</th>
                                <th style={{color: "#000"}} >Вес</th>
                                <th style={{color: "#000"}} >Количество</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.packageList && this.props.packageList.map((pack, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{pack.id}</td>
                                        <td>{pack.title}</td>
                                        <td>{pack.length}</td>
                                        <td>{pack.width}</td>
                                        <td>{pack.height}</td>
                                        <td>{pack.weight}</td>
                                        <td>{pack.quantity}</td>
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

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deletePackage(pack.id)}
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
                            <ControlLabel>Наименование</ControlLabel>
                            <FormControl
                                value={this.state.editingTitle}
                                onChange={(e)=>this.setState({editingTitle: e.target.value})}
                                label="Наименование"
                                type="text"
                                bsClass="form-control"
                                placeholder="Наименование"
                            />
                            <ControlLabel>Длинна</ControlLabel>
                            <FormControl
                                value={this.state.editingLength}
                                onChange={(e)=>this.setState({editingLength: e.target.value})}
                                label="Длинна"
                                type="text"
                                bsClass="form-control"
                                placeholder="Длинна"
                            />
                            <ControlLabel>Ширина</ControlLabel>
                            <FormControl
                                value={this.state.editingWidth}
                                onChange={(e)=>this.setState({editingWidth: e.target.value})}
                                label="Ширина"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Ширина"
                            />
                            <ControlLabel>Высота</ControlLabel>
                            <FormControl
                                value={this.state.editingHeight}
                                onChange={(e)=>this.setState({editingHeight: e.target.value})}
                                label="Высота"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Высота"
                            />
                            <ControlLabel>Вес</ControlLabel>
                            <FormControl
                                value={this.state.editingWeight}
                                onChange={(e)=>this.setState({editingWeight: e.target.value})}
                                label="Вес"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Вес"
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
        packageList: state.package.packageList,
    }),
    (dispatch) => ({
        getPackageList: (packages) => dispatch(getPackageList(packages)),
        addPackageList: (packages) => dispatch(addPackageList(packages))
    })
)(PackagePage));