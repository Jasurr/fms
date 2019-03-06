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
import LoadingOverlay from 'react-loading-overlay';

import {TOKEN, URL} from '../../common/config/url';
import {addUserList, getUserList} from "../../common/actions/EmployeeActions";
import Card from "../../components/Card/Card";

class EmployeePage extends Component {
    state = {
        employeeList: [],
        loadingData: false,
        show: false,
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        showSpinner: false,
        page: 2,
        hasMore: false,
        loadingItems: false,
        error: false,
        toggleActive: false,
        showStatusModal: false,
        staffToggle: true,
        editingUserStatus: "",
        editingUserID: "",
        loadingSaveEdit: false,
        isLoadingActive: true
    };

    _isMounted = false;


    componentDidMount() {
        this._isMounted = true;
        this.setState({error: false})
        this.setState({loadingItems: false});
        this.setState({loadingSaveEdit: false});
        this.setState({loadingData: true})

        if (this._isMounted) {
            axios.get(`${URL}/api/user/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({loadingData: false})
                        this.setState({employeeList: response.data.results});
                        this.setState({isLoadingActive: false});
                        console.log("response.data", response.data);
                        this.props.getUserList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getUserList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/user/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({employeeList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getUserList(response.data.results);
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

        axios.get(`${URL}/api/user/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addUserList(response.data.results)
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
        this.props.getUserList();
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            username: "",
            first_name: "",
            last_name: "",
            password: "",
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

        axios.post(`${URL}/api/user/register`, {
            username: this.state.username,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            password: this.state.password
            },
            { headers: { Authorization: `Token ${TOKEN}` }})
            .then((response) => {
                this.setState({showSpinner: false})
                this.setState({show: false})
                this.setState({
                    username: "",
                    first_name: "",
                    last_name: "",
                    password: "",
                })
                this.getUserList()
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

    deleteUser = (userID) => {
        console.log("userID ", userID)

        axios.delete(`${URL}/api/user/delete/${userID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getUserList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {

                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editUserInfo = (isStaff, id) => {
        this.setState({editingUserID: id});
        this.setState({editingUserStatus: isStaff});
      console.log(isStaff);
      this.setState({showStatusModal: true})
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            editingUserStatus: value
        });
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/user/update/access/${this.state.editingUserID}`, {
            is_staff: this.state.editingUserStatus
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getUserList()
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
                    <h2>Пользователи</h2>
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
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Имя пользователя</th>
                                <th>Доступ</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.userList && this.props.userList.map((user, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{user.id}</td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.is_staff ?
                                            <div
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "20px",
                                                    backgroundColor: "green",
                                                    margin: "auto"
                                                }}
                                            /> :
                                            <div
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "20px",
                                                    backgroundColor: "red",
                                                    margin: "auto"
                                                }}
                                            />
                                        }</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editUserInfo(user.is_staff, user.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteUser(user.id)}
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
                        <Modal.Title>Регистрация пользователя</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Имя пользователя</ControlLabel>
                            <FormControl
                                value={this.state.username}
                                onChange={(e)=>this.setState({username: e.target.value})}
                                label="Имя пользователя"
                                type="text"
                                bsClass="form-control"
                                placeholder="Имя пользователя"
                            />
                            <ControlLabel>Имя</ControlLabel>
                            <FormControl
                                value={this.state.first_name}
                                onChange={(e)=>this.setState({first_name: e.target.value})}
                                label="Имя"
                                type="text"
                                bsClass="form-control"
                                placeholder="Имя"
                            />
                            <ControlLabel>Фамилия</ControlLabel>
                            <FormControl
                                value={this.state.last_name}
                                onChange={(e)=>this.setState({last_name: e.target.value})}
                                label="Фамилия"
                                type="text"
                                bsClass="form-control"
                                placeholder="Фамилия"
                            />
                            <ControlLabel>Пароль</ControlLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={(e)=>this.setState({password: e.target.value})}
                                label="Пароль"
                                type="text"
                                bsClass="form-control"
                                placeholder="Пароль"
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
                                Регистрация
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showStatusModal} onHide={this.closeStatusModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-check">
                            <input
                                style={{float: "left", marginRight: "5px"}}
                                name="isGoing"
                                type="checkbox"
                                checked={this.state.editingUserStatus}
                                onChange={(e)=>this.handleInputChange(e)} />
                                <label className="form-check-label" htmlFor="exampleCheck1">Права администратора</label>
                        </div>
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
        userList: state.employee.userList,
    }),
    (dispatch) => ({
        getUserList: (users) => dispatch(getUserList(users)),
        addUserList: (users) => dispatch(addUserList(users))
    })
)(EmployeePage));