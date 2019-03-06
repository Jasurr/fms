import React, {Component} from 'react';
import {
    Button,
    ControlLabel,
    DropdownButton,
    FormControl,
    FormGroup,
    Modal,
    OverlayTrigger,
    Table,
    Tooltip,
    Dropdown,
    MenuItem
} from "react-bootstrap";
import axios from "axios";
import MDSpinner from "react-md-spinner";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {TOKEN, URL} from '../../common/config/url';
import {addTariffList, getTariffList} from "../../common/actions/TariffActions";
import Card from "../../components/Card/Card";
import {getRegionList} from "../../common/actions/RegionActions";

class TariffPage extends Component {
    state = {
        regionList: [],
        show: false,
        fromTitle: null,
        toTitle: null,
        from: "",
        to: "",
        price: "",
        editingFrom: "",
        editingTo: "",
        editingFromTitle: null,
        editingToTitle: null,
        editingPrice: "",
        editingTariffID: "",
        showSpinner: false,
        page: 2,
        hasMore: false,
        loadingItems: false,
        error: false,
        toggleActive: false,
        showStatusModal: false,
        staffToggle: true,
        loadingSaveEdit: false,
        loadingData: false,
        loadingRegions: false
    };

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            loadingItems: false,
            loadingSaveEdit: false,
            error: false,
            loadingData: true,
            loadingRegions: true
        });

        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/tariff/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        } else if (response.data.next === null) {
                            this.setState({hasMore: false})
                        }
                        this.setState({loadingData: false});
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data);
                        this.props.getTariffList(response.data.results);
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });

            axios.get(`${URL}/api/region/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        this.props.getRegionList(response.data.results);
                        this.setState({loadingRegions: false})
                    }
                })
                .catch((error) => {
                    console.log('Error: => ' + error);
                });
        }
    }

    getTariffList = () => {
        if (this._isMounted) {
            axios.get(`${URL}/api/invoice/tariff/list`,
                { headers: { Authorization: `Token ${TOKEN}` } })
                .then(response => {
                    if (this._isMounted) {
                        if (response.data.next !== null) {
                            this.setState({hasMore: true})
                        }
                        this.setState({regionList: response.data.results});
                        console.log("response.data", response.data)
                        this.props.getTariffList(response.data.results);
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

        axios.get(`${URL}/api/invoice/tariff/list?page=${page}`,
            {headers: {Authorization: `Token ${TOKEN}`}})
            .then(response => {
                if (response.data.next === null) {
                    this.setState({hasMore: false})
                }
                console.log("response.data ==> page => ", page , response.data);
                this.setState({page: this.state.page + 1});
                this.setState({loadingItems: false});
                this.props.addTariffList(response.data.results)
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
            error: false,
        });
        this.props.getTariffList();
        this.props.getRegionList();
    }

    handleClose = () => {
        this.setState({ show: false });
        this.setState({
            from: "",
            fromTitle: null,
            to: "",
            toTitle: null,
            price: "",
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

        axios.post(`${URL}/api/invoice/tariff/create`, {
                city_from_a: this.state.from,
                city_to_a: this.state.to,
                price: this.state.price
            },
            { headers: { Authorization: `Token ${TOKEN}` }})
            .then((response) => {
                this.setState({showSpinner: false})
                this.setState({show: false})
                this.setState({
                    from: "",
                    to: "",
                    price: "",
                    toTitle: null,
                    fromTitle: null
                });
                this.getTariffList();
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

    deleteTariff = (tariffID) => {
        console.log("regionID ", tariffID)

        axios.delete(`${URL}/api/invoice/tariff/delete/${tariffID}`,
            {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then((response) => {
                this.getTariffList()
                this.setState({});
                console.log("response", response)})
            .catch((error) => {
                console.log(error.response);
            });
    };

    closeStatusModal = () => {
        this.setState({showStatusModal: false})
    };

    editTariffInfo = (tariff, id) => {
        this.setState({
            editingFrom: tariff.city_from_a.id,
            editingTo: tariff.city_to_a.id,
            editingFromTitle: tariff.city_from_a.title,
            editingToTitle: tariff.city_to_a.title,
            editingPrice: tariff.price,
            editingTariffID: id,
            showStatusModal: true
        });
        console.log(tariff);
    };

    saveStatus = () => {
        this.setState({loadingSaveEdit: true});

        axios.put(`${URL}/api/invoice/tariff/update/${this.state.editingTariffID}`, {
                city_from_a: this.state.editingFrom,
                city_to_a: this.state.editingTo,
                price: this.state.editingPrice
            }
            , {
                headers: { Authorization: `Token ${TOKEN}` }
            })
            .then(res => {
                console.log("res ", res);
                this.setState({loadingSaveEdit: false})
                this.setState({showStatusModal: false})
                this.getTariffList()
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
                    <h2>Тарифы</h2>
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
                                <th>Откуда</th>
                                <th>Куда</th>
                                <th>Цена (сум)</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.tariffList && this.props.tariffList.map((tariff, id) => {
                                return (
                                    <tr key={id}>
                                        <td>{tariff.id}</td>
                                        <td>{tariff.city_from_a.title} ({tariff.city_from_a.short})</td>
                                        <td>{tariff.city_to_a.title} ({tariff.city_to_a.short})</td>
                                        <td>{tariff.price}</td>
                                        <td className="td-actions"
                                            style={{textAlign: "center", maxWidth: "45px", minWidth: "40px"}}>
                                            <OverlayTrigger placement="top" overlay={<Tooltip
                                                id="edit_tooltip">Редактировать</Tooltip>}>
                                                <Button
                                                    onClick={() => {
                                                        this.editTariffInfo(tariff, tariff.id)
                                                    }}
                                                    bsStyle="info" bsSize="xs">
                                                    <i className="fa fa-edit"/>
                                                </Button>
                                            </OverlayTrigger>

                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="remove_tooltip">Удалить</Tooltip>}>
                                                <Button
                                                    onClick={() => this.deleteTariff(tariff.id)}
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
                        <Modal.Title>Добавить тариф</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{display: "flex"}}>
                        <div style={{marginBottom: "15px", flex: 1}}>
                        <span style={{fontWeight: "bold"}}>Откуда: </span>
                            {this.state.loadingRegions ?
                                <Button variant="primary" style={{paddingLeft: "35px", paddingRight: "35px", paddingTop: "7.5px", paddingBottom: "7.5px" }}>
                                    <MDSpinner size="17"/>
                                </Button>
                                :
                                <DropdownButton
                                    title={this.state.fromTitle || "Выбрать"}
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
                                                        fromTitle: red.title,
                                                        from: red.id
                                                    });
                                                    console.log("here ", red)
                                                }}
                                            >
                                                {red.title}
                                            </MenuItem>
                                        )
                                    })}
                                </DropdownButton>
                            }
                        </div>
                        <div style={{flex: 1}}>
                        <span style={{fontWeight: "bold"}}>Куда: </span>
                            {this.state.loadingRegions ?
                                <Button variant="primary" style={{paddingLeft: "35px", paddingRight: "35px", paddingTop: "7.5px", paddingBottom: "7.5px" }}>
                                    <MDSpinner size="17"/>
                                </Button>
                                :
                                <DropdownButton
                                    title={this.state.toTitle || "Выбрать"}
                                    variant="primary"
                                    id="dropdown-variants-region-to"
                                    key="city-to"
                                >
                                    {this.props.regionList && this.props.regionList.map((red, id) => {
                                        return (
                                            <MenuItem
                                                key={id}
                                                onClick={() => {
                                                    this.setState({
                                                        toTitle: red.title,
                                                        to: red.id
                                                    });
                                                    console.log("here ", red)
                                                }}
                                            >
                                                {red.title}
                                            </MenuItem>
                                        )
                                    })}
                                </DropdownButton>
                            }
                        </div>
                        </div>
                        <FormGroup>
                            <ControlLabel style={{fontWeight: "bold"}}>Цена</ControlLabel>
                            <FormControl
                                value={this.state.price}
                                onChange={(e)=>this.setState({price: e.target.value})}
                                label="Цена"
                                type="text"
                                bsClass="form-control"
                                placeholder="Цена"
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
                        <div style={{display: "flex"}}>
                            <div style={{marginBottom: "15px", flex: 1}}>
                                <span style={{fontWeight: "bold"}}>Откуда: </span>
                                <DropdownButton
                                    title={this.state.editingFromTitle || "Выбрать"}
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
                                                        editingFromTitle: red.title,
                                                        editingFrom: red.id
                                                    });
                                                    console.log("here ", red)}}
                                            >
                                                {red.title}
                                            </MenuItem>
                                        )
                                    })}
                                </DropdownButton>
                            </div>
                            <div style={{flex: 1}}>
                                <span style={{fontWeight: "bold"}}>Куда: </span>
                                <DropdownButton
                                    title={this.state.editingToTitle || "Выбрать"}
                                    variant="primary"
                                    id="dropdown-variants-region-to"
                                    key="city-to"
                                >
                                    {this.props.regionList && this.props.regionList.map((red, id) => {
                                        return (
                                            <MenuItem
                                                key={id}
                                                onClick={() => {
                                                    this.setState({
                                                        editingToTitle: red.title,
                                                        editingTo: red.id
                                                    });
                                                    console.log("here ", red)}}
                                            >
                                                {red.title}
                                            </MenuItem>
                                        )
                                    })}
                                </DropdownButton>
                            </div>
                        </div>
                        <FormGroup>
                            <ControlLabel style={{fontWeight: "bold"}}>Цена</ControlLabel>
                            <FormControl
                                value={this.state.editingPrice}
                                onChange={(e)=>this.setState({editingPrice: e.target.value})}
                                label="Цена"
                                type="text"
                                bsClass="form-control"
                                placeholder="Цена"
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
        tariffList: state.tariff.tariffList,
        regionList: state.region.regionList,
    }),
    (dispatch) => ({
        getTariffList: (tariffs) => dispatch(getTariffList(tariffs)),
        addTariffList: (tariffs) => dispatch(addTariffList(tariffs)),
        getRegionList: (regions) => dispatch(getRegionList(regions))
    })
)(TariffPage));
