import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from 'components/Card/Card.jsx';
import Loading from "components/Loading";
import TableList from "./TableList/TableList";


class FinishedProduct extends React.Component {


    render() {
        const {processing, data} = this.props
        return (
            <div className="content">
                {processing && <Loading/>}
                <Card
                    // plain
                    title={""}
                    className={'card-plain'}
                    category={this.props.description}
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                        <div>Uvidomlenye</div>
                    }
                />
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        data: state.orderProduct.orderProductList,
        processing: state.orderProduct.processing
    };
};

export default connect(mapStateToProps)(FinishedProduct);
