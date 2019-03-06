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
import {addFeedbackList, getFeedbackList} from "../../common/actions/FeedbackActions";

class FeedbackPage extends Component {
    state = {
        show: false,
        loadingData: false,
        editingSubject: "",
        editingFromCustomer: "",
        editingMessage: "",
        editingFeedbackID: "",
        showSpinner: false,
        page: 2,
        hasMore: false,
        loadingItems: false,
        error: false,
        toggleActive: false,
        showStatusModal: false,
        staffToggle: true,
        loadingSaveEdit: false
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.setState({error: false})
        this.setState({loadingItems: false});
        this.setState({loadingSaveEdit: false});
        this.setState({loadingData: true})

        if (this._isMounted) {
            axios.get(`${URL}/api/feedback/list`,
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
                        this.props.getFeedbackList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getFeedbackList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/feedback/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({feedbackList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getFeedbackList(response.data.results);
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

        axios.get(`${URL}/api/feedback/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addFeedbackList(response.data.results)
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
        this.setState({error: false})
        this.props.getFeedbackList();
    }

    handleShow = () => {
        this.setState({ show: true });
    };

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    };

    deleteFeedback = (feedbackID) => {
        console.log("feedbackID ", feedbackID)

        axios.delete(`${URL}/api/feedback/delete/${feedbackID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getFeedbackList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editFeedbackInfo = (feed, id) => {
        this.setState({
            editingSubject: feed.subject,
            editingFromCustomer: feed.from_customer,
            editingMessage: feed.message,
            editingFeedbackID: id
        });

        console.log(feed);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/feedback/update/${this.state.editingServiceID}`, {
                subject: this.state.editingSubject,
                from_customer: this.state.editingFromCustomer,
                message: this.state.editingMessage,
                // reply: this.state.editingQuantity,
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getFeedbackList()
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
                    <h2>Отзывы</h2>
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
                                <th>От</th>
                                <th>Тема</th>
                                <th>Сообщение</th>
                                <th>Дата создания</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.feedbackList && this.props.feedbackList.map((feed, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{feed.id}</td>
                                        <td>{feed.from_customer}</td>
                                        <td>{feed.subject}</td>
                                        <td>{feed.message}</td>
                                        <td>{feed.created}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editFeedbackInfo(feed, feed.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteFeedback(feed.id)}
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
                            <ControlLabel>Тема</ControlLabel>
                            <FormControl
                                value={this.state.editingSubject}
                                onChange={(e)=>this.setState({editingSubject: e.target.value})}
                                label="Тема"
                                type="text"
                                bsClass="form-control"
                                placeholder="Тема"
                            />
                            <ControlLabel>От:</ControlLabel>
                            <FormControl
                                value={this.state.editingFromCustomer}
                                onChange={(e)=>this.setState({editingPassport: e.target.value})}
                                label="Почта"
                                type="text"
                                bsClass="form-control"
                                placeholder="Почта"
                            />
                            <ControlLabel>Сообщение</ControlLabel>
                            <FormControl
                                value={this.state.editingMessage}
                                onChange={(e)=>this.setState({editingMessage: e.target.value})}
                                label="Сообщение"
                                as="textarea" rows="3"
                                bsClass="form-control"
                                placeholder="Сообщение"
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
        feedbackList: state.feedback.feedbackList,
    }),
    (dispatch) => ({
        getFeedbackList: (feedback) => dispatch(getFeedbackList(feedback)),
        addFeedbackList: (feedback) => dispatch(addFeedbackList(feedback))
    })
)(FeedbackPage));