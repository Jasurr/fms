import React, {Component} from 'react'
import {connect} from "react-redux";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {setSettings} from "../../reducer";

class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.props.settings
        }
    }

    render() {
        const {is_volume, is_weight} = this.state
        let dis_volume = false, dis_weight = false
        if (is_volume) {
            dis_weight = true;
            dis_volume = false
        } else if (is_weight) {
            dis_weight=false
            dis_volume = true
        }
        return (<div style={{padding: 20}}>
            <h4 style={{textAlign: 'center'}}>Настройки</h4>
            <hr />
            <p>Посчитать:</p>
            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: 20}}>
                <label className="container-checkbox">
                    <input type={'checkbox'}
                           id={'to_be_picked'}
                           disabled={dis_weight}
                           checked={this.state.is_weight}
                           onChange={() => this.setState({is_weight: !this.state.is_weight})}
                    />
                    <span className="checkmark"/>
                </label>
                <p>
                    По массу
                </p>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: 20}}>
                <label className="container-checkbox">
                    <input type={'checkbox'}
                           id={'to_be_picked'}
                           disabled={dis_volume}
                           checked={this.state.is_volume}
                           onChange={() => this.setState({is_volume: !this.state.is_volume})}
                    />
                    <span className="checkmark"/>
                </label>
                <p>
                    По объему
                </p>
            </div>
            <p>Сумма по тарифу:</p>
            <div style={{display: 'flex', flexDirection: 'row', paddingLeft: 20}}>
                <FormGroup>
                    <FormControl
                        type={'number'}
                        placeholder={'6000'}
                        value={this.state.tariff_summ}
                        onChange={(event) => this.setState({tariff_summ: event.target.value})}
                    />
                </FormGroup>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', padding: 20, justifyContent: 'flex-end', alignContent: 'flex-end'}}>
                <Button type={'submit'}
                        onClick={() => {
                            if (this.state.is_volume || this.state.is_weight) {
                                this.props.setSettings({
                                    is_weight: this.state.is_weight,
                                    is_volume: this.state.is_volume,
                                    tariff_summ: this.state.tariff_summ
                                });
                                this.props.close()
                            } else {
                                alert('Выберите по массу или по объема')
                            }

                        }}
                        style={{backgroundColor: '#1D5C90', color: '#fff', fontSize: 14}}
                >
                    Сохранить</Button>
            </div>
        </div>)
    }
}
const mapsStateToProps = state => ({
    settings: state.orderProduct.settings
})
const Dispatch = (dispatch) => ({
    setSettings: (data) => dispatch(setSettings(data))
})
export default connect(mapsStateToProps, Dispatch)(Settings)