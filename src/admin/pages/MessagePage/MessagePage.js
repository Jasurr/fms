import React, {Component} from 'react';
import {
    Button,
    ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip,
    MenuItem,
    DropdownButton
} from "react-bootstrap";
import axios from "axios";
import MDSpinner from "react-md-spinner";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import InputMask from 'react-input-mask';


import {TOKEN, URL} from '../../common/config/url';
import Card from "../../components/Card/Card";
import {addMessageList, getMessageList} from "../../common/actions/MessageActions";
import {getRegionList} from "../../common/actions/RegionActions";

class MessagePage extends Component {
    state = {
        regionList: [],
        show: false,
        regionText: "",
        region: "",
        text: "",
        phone: "",

        editingRegion: "",
        editingRegionText: "",
        editingText: "",
        editingPhone: "",
        editingMessageID: "",

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
        this.getRegionList();

        if (this._isMounted) {
            axios.get(`${URL}/api/feedback/message/list`,
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
                        this.props.getMessageList(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getBoxList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/feedback/message/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getMessageList(response.data);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    };

    getRegionList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/region/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data});
                        console.log("response.data", response.data)
                        this.props.getRegionList(response.data);
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

        axios.get(`${URL}/api/feedback/message/list?page=${page}`,
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
        this.props.getMessageList()
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            region: "",
            text: "",
            phone: ""
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

        axios.post(`${URL}/api/feedback/message/create`, {
                region: this.state.region,
                text: this.state.text,
                phone: this.state.phone
            },
            { headers: { Authorization: `Token ${TOKEN}` }})
            .then((response) => {
                this.setState({showSpinner: false})
                this.setState({show: false})
                this.setState({
                    region: "",
                    text: "",
                    phone: ""
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

        axios.delete(`${URL}/api/feedback/message/delete/${boxID}`,
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

        this.setState({
            editingRegionText: box.region.title,
            editingRegion: box.region.id,
            editingText: box.text,
            editingPhone: box.phone,
            editingMessageID: id,
            showStatusModal: true
        });

        console.log(box);

    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/feedback/message/update/${this.state.editingMessageID}`, {
                region: this.state.editingRegion,
                text: this.state.editingText,
                phone: this.state.editingPhone
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
                    <h2>Сообщение</h2>
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
                                <th style={{color: "#000"}} >ID</th>
                                <th style={{color: "#000"}} >Регион</th>
                                <th style={{color: "#000"}} >Текст</th>
                                <th style={{color: "#000"}} >Номер телефона</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.messageList && this.props.messageList.map((box, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{box.id}</td>
                                        <td>{box.region.title}</td>
                                        <td>{box.text}</td>
                                        <td>{box.phone}</td>
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
                        <Modal.Title>Добавление сообщения</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DropdownButton
                            title={this.state.regionText || "Выбрать"}
                            variant="primary"
                            id="dropdown-variants-region"
                            key="city-from"
                        >
                            {this.props.regionList && this.props.regionList.map((red, id) => {
                                return (
                                    <MenuItem
                                        key={id}
                                        onClick={() => {
                                            this.setState({
                                                regionText: red.title,
                                                region: red.id
                                            });
                                            console.log("here ", red)
                                        }}
                                    >
                                        {red.title}
                                    </MenuItem>
                                )
                            })}
                        </DropdownButton>
                        <FormGroup>
                            <ControlLabel>Номер Телефона</ControlLabel>
                            <InputMask mask="+\9\9\8 (99) 999-99-99"
                                       value={this.state.phone}
                                       onChange={(e)=>this.setState({phone: e.target.value})}
                                       label="Номер Телефона"
                                       type="text"
                                       bsClass="form-control"
                                       placeholder="Номер Телефона"
                            />
                            <ControlLabel>Текст</ControlLabel>
                            <FormControl
                                value={this.state.text}
                                onChange={(e)=>this.setState({text: e.target.value})}
                                label="Текст"
                                type="text"
                                bsClass="form-control"
                                placeholder="Текст"
                            />
                        </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {this.state.error ?
                            <div style={{float: "left"}}>
                                <span style={{color: "red"}}>Ошибка</span>
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
                        <DropdownButton
                            title={this.state.editingRegionText || "Выбрать"}
                            variant="primary"
                            id="dropdown-variants-region"
                            key="city-from"
                        >
                            {this.props.regionList && this.props.regionList.map((red, id) => {
                                return (
                                    <MenuItem
                                        key={id}
                                        onClick={() => {
                                            this.setState({
                                                editingRegionText: red.title,
                                                editingRegion: red.id
                                            });
                                            console.log("here ", red)
                                        }}
                                    >
                                        {red.title}
                                    </MenuItem>
                                )
                            })}
                        </DropdownButton>
                        <FormGroup>
                            <ControlLabel>Номер Телефона</ControlLabel>
                            <InputMask mask="+\9\9\8 (99) 999-99-99"
                                       value={this.state.editingPhone}
                                       onChange={(e)=>this.setState({editingPhone: e.target.value})}
                                       label="Номер Телефона"
                                       type="text"
                                       bsClass="form-control"
                                       placeholder="Номер Телефона"
                            />
                            <ControlLabel>Текст</ControlLabel>
                            <FormControl
                                value={this.state.editingText}
                                onChange={(e)=>this.setState({editingText: e.target.value})}
                                label="Текст"
                                type="text"
                                bsClass="form-control"
                                placeholder="Текст"
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
        messageList: state.message.messageList,
        regionList: state.region.regionList
    }),
    (dispatch) => ({
        getMessageList: (boxes) => dispatch(getMessageList(boxes)),
        addMessageList: (boxes) => dispatch(addMessageList(boxes)),
        getRegionList: (regions) => dispatch(getRegionList(regions))
    })
)(MessagePage));