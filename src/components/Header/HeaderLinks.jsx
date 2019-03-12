import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, Grid, MenuItem, Modal, Nav, NavDropdown, NavItem} from "react-bootstrap";
import {Routines} from 'common/api';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/es/Navbar";
import {reduxForm} from "redux-form";
import {searchText} from "../../views/Pages/reducer";
import Settings from "../../views/Pages/OrderProduct";


class HeaderLinks extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showSearch: false
        }
    }
    componentDidMount() {
        const {reset} = this.props
        reset()
    }

    logoutUser = () => {
        const {dispatch} = this.props
        Routines.admin.logoutUser({}, dispatch)
    }

    searchText(e) {
        const {dispatch, history} = this.props
        let val = e.target.value

        if (val.length > 0){
            this.setState({showSearch: true})
            Routines.admin.searchList({
                request: {
                    search: e.target.value
                }
            }, dispatch)
        } else {
            this.setState({showSearch: false})
        }

    }

    render() {
        return (
            <div>
                <Modal
                    onHide={() => this.setState({showFilter: false})}
                    show={this.state.showFilter}
                >
                    <div style={{
                        padding: 20,
                        height: 300
                    }}>
                        <h4>Фильтр</h4>
                        <hr />
                        <Col xs={1} md={1} >
                            <p>От: </p>
                        </Col>
                        <Col xs={4} md={4} style={{display: 'flex', flexDirection: 'row'}}>
                            <FormGroup>
                                <FormControl
                                    type={'date'}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs={2} md={2}/>
                        <Col xs={1} md={1} >
                            <p>До: </p>
                        </Col>
                        <Col xs={4} md={4} style={{display: 'flex', flexDirection: 'row'}}>
                            <FormGroup>
                                <FormControl
                                    type={'date'}
                                />
                            </FormGroup>
                        </Col>
                            <Button style={{
                               position: 'absolute',
                                bottom: 20,
                                right: 20,
                                backgroundColor: '#1D5C90',
                                color: '#ffffff'
                            }}
                                    onClick={() => {

                                    }}
                            >Пременить</Button>
                        <Button style={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                        }}
                                onClick={() => this.setState({showFilter: false})}
                        >Отменить</Button>
                    </div>
                </Modal>
                <Navbar.Form pullLeft>
                    <Col xs={12} style={{
                        display: 'flex',
                        flexDirection:'row'
                    }}>
                    <form>
                        <FormGroup>
                            <FormControl
                                className={'search-box'}
                                type={'text'}
                                name={'search'}
                                placeholder={'Search'}
                                onChange={(e) => this.searchText(e)}
                            />
                        </FormGroup>
                    </form>
                    <a
                        onClick={() => this.setState({showFilter: !this.state.showFilter})}
                        style={{
                        fontSize: 14,
                        border: '1px solid lightgray',
                        padding: 0,
                        paddingLeft: 10,
                        paddingRight: 10,
                        margin:0,
                        cursor: 'pointer',
                        height: 20,
                        color: 'lightgray',
                        borderRadius: 5
                    }}>Filter</a>
                    </Col>
                </Navbar.Form>
                <Nav pullRight>
                    <NavItem eventKey={1}>
                        {/*<img src={require('../../assets/img/nav/Chat Icon.png')}/>*/}
                    </NavItem>
                    <NavItem eventKey={2}>
                        {/*<img src={require('../../assets/img/nav/Notification Icon.png')}/>*/}
                    </NavItem>
                    <NavItem eventKey={3} role={'divider '}>
                        <img src={require('../../assets/img/nav/Divider.png')}/>
                    </NavItem>
                    <NavDropdown eventKey={3} title="Алишер Махкамов" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.2}>Settings</MenuItem>
                        <MenuItem divider/>
                        <MenuItem eventKey={3.1} onClick={() => this.logoutUser()}><NavLink
                            to={'/'}>Выйти</NavLink></MenuItem>
                    </NavDropdown>
                    <NavItem className={'avatar-logo'}>
                        <img src={require('../../assets/img/nav/Avatar.png')} width={30} height={30}/>
                    </NavItem>
                </Nav>
                {this.state.showSearch && <div style={{
                    width: '100%',
                    height: 800,
                    backgroundColor: 'rgba(0, 0, 0, .3)',
                    position: 'absolute',
                    top: 52,
                    left: 0,
                    zIndex: 99,
                }}>
                    {(this.props.searchText && this.props.searchText !== undefined && this.props.searchText.length > 0) ?  this.props.searchText.map((item, i) => {
                        return <div className={'search-container'} key={i}>
                            <NavLink className="fill-div" onClick={() => {
                                this.props.searchTextDis(item)
                                this.setState({showSearch: false})
                            }} to={'/main'}>
                                <b>Отпр:</b> {item.sender_region} <b>Полу:</b> {item.receiver_region}
                                <b>Состоятие: </b>{item.status}
                            </NavLink>
                        </div>
                    }): <div style={{
                        textAlign: 'center',
                        width: '100%',
                        padding: 50
                    }}>
                        <p style={{
                            color: '#fff'
                        }}>Нечего не найдено!</p>
                        </div>}
                </div>}
            </div>
        );
    }
}

const _HeaderLinks = reduxForm({
    form: 'searchText'
})(HeaderLinks)

const mapsStateToProps = (state) => {
    return {
        searchText: state.searchText.searchText,
    }
}
const mapsDispatch = (dispatch) => ({
    searchTextDis: (data) => dispatch(searchText(data))
})
export default connect(mapsStateToProps, mapsDispatch)(_HeaderLinks);
