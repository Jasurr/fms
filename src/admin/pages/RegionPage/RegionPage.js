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
import {addRegionList, getRegionList} from "../../common/actions/RegionActions";
import Card from "../../components/Card/Card";

class RegionPage extends Component {
    state = {
        regionList: [],
        show: false,
        title: "",
        short: "",
        editingTitle: "",
        editingShort: "",
        editingRegionID: "",
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
        this.setState({loadingData: true})

        if (this._isMounted) {
            axios.get(`${URL}/api/region/list`,
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
                        this.props.getRegionList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getRegionList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/region/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getRegionList(response.data.results);
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

        axios.get(`${URL}/api/region/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addRegionList(response.data.results)
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
        this.props.getRegionList()
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

    confirm = () => {
        this.setState({error: false})
        this.setState({showSpinner: true});
        console.log("state ", this.state );

        axios.post(`${URL}/api/region/create`, {
                title: this.state.title,
                short: this.state.short,
            },
            { headers: { Authorization: `Token ${TOKEN}` }})
            .then((response) => {
                this.setState({showSpinner: false})
                this.setState({show: false})
                this.setState({
                    title: "",
                    short: ""
                });
                this.getRegionList();
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

    deleteRegion = (regionID) => {
        console.log("regionID ", regionID)

        axios.delete(`${URL}/api/region/delete/${regionID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getRegionList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editRegionInfo = (region, id) => {
        this.setState({editingTitle: region.title});
        this.setState({editingShort: region.short});
        this.setState({editingRegionID: id});
        console.log(region);
        this.setState({showStatusModal: true})
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/region/update/${this.state.editingRegionID}`, {
                title: this.state.editingTitle,
                short: this.state.editingShort
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getRegionList()
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
                    <h2>Регионы</h2>
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
                                <th>№</th>
                                <th>ID</th>
                                <th>Название</th>
                                <th>Короткое название</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.regionList && this.props.regionList.map((region, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{id + 1}</td>
                                        <td>{region.id}</td>
                                        <td>{region.title}</td>
                                        <td>{region.short}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editRegionInfo(region, region.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteRegion(region.id)}
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
                        <Modal.Title>Добавление региона</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup>
                            <ControlLabel>Название региона</ControlLabel>
                            <FormControl
                                value={this.state.title}
                                onChange={(e)=>this.setState({title: e.target.value})}
                                label="Название региона"
                                type="text"
                                bsClass="form-control"
                                placeholder="Название региона"
                            />
                            <ControlLabel>Короткое название</ControlLabel>
                            <FormControl
                                value={this.state.short}
                                onChange={(e)=>this.setState({short: e.target.value})}
                                label="Короткое название"
                                type="text"
                                bsClass="form-control"
                                placeholder="Короткое название"
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
                            <ControlLabel>Название региона</ControlLabel>
                            <FormControl
                                value={this.state.editingTitle}
                                onChange={(e)=>this.setState({editingTitle: e.target.value})}
                                label="Название региона"
                                type="text"
                                bsClass="form-control"
                                placeholder="Название региона"
                            />
                            <ControlLabel>Короткое название</ControlLabel>
                            <FormControl
                                value={this.state.editingShort}
                                onChange={(e)=>this.setState({editingShort: e.target.value})}
                                label="Короткое название"
                                type="text"
                                bsClass="form-control"
                                placeholder="Короткое название"
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
        regionList: state.region.regionList,
    }),
    (dispatch) => ({
        getRegionList: (regions) => dispatch(getRegionList(regions)),
        addRegionList: (regions) => dispatch(addRegionList(regions))
    })
)(RegionPage));