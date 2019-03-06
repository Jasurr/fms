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
import {addBoxList, getBoxList} from "../../common/actions/BoxActions";
import Card from "../../components/Card/Card";

class RegionPage extends Component {
    state = {
        regionList: [],
        show: false,
        number: "",
        size: "",
        description: "",
        editingNumber: "",
        length: "",
        width: "",
        height: "",
        editingLength: "",
        editingWidth: "",
        editingHeight: "",
        editingDescription: "",
        editingBoxID: "",
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
        this.setState({loadingSaveEdit: false});
        this.setState({loadingData: true});

        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/box/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({loadingData: false})
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data);
                        this.props.getBoxList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getBoxList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/box/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getBoxList(response.data.results);
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

        axios.get(`${URL}/api/invoice/box/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addBoxList(response.data.results)
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
        this.props.getBoxList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            number: "",
            size: "",
            description: "",
            length: "",
            width: "",
            height: "",
        })
        this.setState({error: false})
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    confirm = () => {
        this.setState({error: false})
        this.setState({showSpinner: true});
        console.log("state ", this.state );

        axios.post(`${URL}/api/invoice/box/create`, {
                number: this.state.number,
                size: `${this.state.length}x${this.state.width}x${this.state.height}`,
                description: this.state.description
            },
            { headers: { Authorization: `Token ${TOKEN}` }})
            .then((response) => {
                this.setState({showSpinner: false})
                this.setState({show: false})
                this.setState({
                    number: "",
                    size: "",
                    description: "",
                    length: "",
                    width: "",
                    height: "",
                });
                this.getBoxList();
                console.log("response.data", response.data)})
            .catch((error) => {
                this.setState({error: true})
                this.setState({showSpinner: false});
                console.log(error.response);
            });
    };

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    };

    deleteBox = (boxID) => {
        console.log("regionID ", boxID)

        axios.delete(`${URL}/api/invoice/box/delete/${boxID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getBoxList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editBoxInfo = (box, id) => {
        const size = box.size;
        const getPosition = (string, subString, index) => {
            return string.split(subString, index).join(subString).length;
        };

        const widthPosition = getPosition(size, "x", 2);

        const width = box.size.slice(box.size.indexOf("x") + 1, widthPosition);

        let height = box.size.substring(
            box.size.lastIndexOf("x") + 1,
            box.size.length
        );

        let length = box.size.slice(0, box.size.indexOf("x"));

        console.log("length ==>", length);
        console.log("width ==>", width);
        console.log("height ==>", height);

        this.setState({
            editingNumber: box.number,
            editingLength: length,
            editingWidth: width,
            editingHeight: height,
            editingDescription: box.description,
            editingBoxID: id,
            showStatusModal: true
        });

        console.log(box);

    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/invoice/box/update/${this.state.editingBoxID}`, {
                number: this.state.editingNumber,
                size: `${this.state.editingLength}x${this.state.editingWidth}x${this.state.editingHeight}`,
                description: this.state.editingDescription
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getBoxList()
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
                    <h2>Коробки</h2>
                </div>
                <Button
                    variant="primary"
                    style={{marginBottom: "15px"}}
                    onClick={() => this.handleShow()}
                >Добавить</Button>
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
                                <th>Номер</th>
                                <th>Размер</th>
                                <th>Описание</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.boxList && this.props.boxList.map((box, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{box.id}</td>
                                        <td>{box.number}</td>
                                        <td>{box.size}</td>
                                        <td>{box.description}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editBoxInfo(box, box.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteBox(box.id)}
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

                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление коробки</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Номер коробки</ControlLabel>
                            <FormControl
                                value={this.state.number}
                                onChange={(e)=>this.setState({number: e.target.value})}
                                label="Номер коробки"
                                type="text"
                                bsClass="form-control"
                                placeholder="Номер коробки"
                            />
                            <ControlLabel>Длинна</ControlLabel>
                            <FormControl
                                value={this.state.length}
                                onChange={(e)=>this.setState({length: e.target.value})}
                                label="Длинна"
                                type="text"
                                bsClass="form-control"
                                placeholder="Длинна"
                            />
                            <ControlLabel>Ширина</ControlLabel>
                            <FormControl
                                value={this.state.width}
                                onChange={(e)=>this.setState({width: e.target.value})}
                                label="Ширина"
                                type="text"
                                bsClass="form-control"
                                placeholder="Ширина"
                            />
                            <ControlLabel>Высота</ControlLabel>
                            <FormControl
                                value={this.state.height}
                                onChange={(e)=>this.setState({height: e.target.value})}
                                label="Высота"
                                type="text"
                                bsClass="form-control"
                                placeholder="Высота"
                            />
                            <ControlLabel>Описание</ControlLabel>
                            <FormControl
                                value={this.state.description}
                                onChange={(e)=>this.setState({description: e.target.value})}
                                label="Описание"
                                as="textarea"
                                rows="3"
                                bsClass="form-control"
                                placeholder="Описание"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.error ?
                            <div style={{float: "left"}}>
                                <span style={{color: "red"}}>Ошибка при регистрации</span>
                            </div>
                            :
                            null}
                        <Button variant="secondary" onClick={() => this.handleClose()}>
                            Закрыть
                        </Button>
                        {this.state.showSpinner ?
                            <Button variant="primary">
                                <MDSpinner size="17" />
                            </Button>
                            :
                            <Button variant="primary" onClick={() => this.confirm()}>
                                Добавить
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showStatusModal} onHide={this.closeStatusModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Номер коробки</ControlLabel>
                            <FormControl
                                value={this.state.editingNumber}
                                onChange={(e)=>this.setState({editingNumber: e.target.value})}
                                label="Номер коробки"
                                type="text"
                                bsClass="form-control"
                                placeholder="Номер коробки"
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
                                type="text"
                                bsClass="form-control"
                                placeholder="Ширина"
                            />
                            <ControlLabel>Высота</ControlLabel>
                            <FormControl
                                value={this.state.editingHeight}
                                onChange={(e)=>this.setState({editingHeight: e.target.value})}
                                label="Высота"
                                type="text"
                                bsClass="form-control"
                                placeholder="Высота"
                            />
                            <ControlLabel>Описание</ControlLabel>
                            <FormControl
                                value={this.state.editingDescription}
                                onChange={(e)=>this.setState({editingDescription: e.target.value})}
                                label="Размер коробки"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Размер коробки"
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
        boxList: state.box.boxList,
    }),
    (dispatch) => ({
        getBoxList: (boxes) => dispatch(getBoxList(boxes)),
        addBoxList: (boxes) => dispatch(addBoxList(boxes))
    })
)(RegionPage));