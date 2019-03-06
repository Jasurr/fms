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
import {addMethodList, getMethodList} from "../../common/actions/MethodActions";

class MethodPage extends Component {
    state = {
        methodList: [],
        show: false,
        editingKg: "",
        editingMethodID: "",
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
            axios.get(`${URL}/api/invoice/package/method/list`,
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
                            regionList: response.data.results
                        });
                        console.log("response.data", response.data);
                        this.props.getMethodList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getMethodList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/package/method/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getMethodList(response.data.results);
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

        axios.get(`${URL}/api/invoice/package/method/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addMethodList(response.data.results)
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
        this.props.getMethodList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            editingKg: "",
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

    editMethodInfo = (method, id) => {
        this.setState({
            editingMethodID: method.id,
            editingKg: method.for_additional_kg,
        });

        console.log("method ", method);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/invoice/package/method/update/${this.state.editingMethodID}`, {
                for_additional_kg: this.state.editingKg
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getMethodList()
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
                    <h2>Метод</h2>
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
                                <th>Дополнительная цена</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.methodList && this.props.methodList.map((method, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{method.id}</td>
                                        <td>{method.for_additional_kg}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editMethodInfo(method, method.id)
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
                            <ControlLabel>Дополнительная цена</ControlLabel>
                            <FormControl
                                value={this.state.editingKg}
                                onChange={(e)=>this.setState({editingKg: e.target.value})}
                                label="Дополнительная цена"
                                type="text"
                                bsClass="form-control"
                                placeholder="Дополнительная цена"
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
        methodList: state.method.methodList,
    }),
    (dispatch) => ({
        getMethodList: (methods) => dispatch(getMethodList(methods)),
        addMethodList: (methods) => dispatch(addMethodList(methods))
    })
)(MethodPage));