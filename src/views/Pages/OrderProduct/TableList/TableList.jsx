import React from 'react'
import {connect} from "react-redux";
import {addRow, fillTable, removeRow} from "../../reducer";


class TableList extends React.Component {

    constructor(props) {
        super(props);

        //  this.state.products = [];
        this.state = {};
        this.state.filterText = "";
        this.state.products = this.props.products
    }


    handleRowDel(product) {
        // var index = this.state.products.indexOf(product);
        // this.state.products.splice(index, 1);
        // this.setState(this.state.products);
        this.props.deleteRow(product)
    };

    handleAddEvent(evt) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var product = {
            id: id,
            title: "",
            width: '',
            height: '',
            length: '',
            weight: '',
            quantity: '',
            total_weight: ''
        }
        // this.state.products.push(product);
        // this.setState(this.state.products);
        this.props.addRow(product)

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.products !== nextProps.products) {
            this.setState({products: nextProps.products})
            this.props.finalSum()
        }
    }

    handleProductTable(evt) {
        var item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value
        };
        var products = this.state.products.slice();
        var newProducts = products.map(function (product) {
            for (var key in product) {
                if (key === item.name && product.id === item.id) {
                    product[key] = item.value;
                }
            }
            return product;
        });
        // this.setState({products: newProducts});
        this.props.finalSum()
        this.props.fillRow(newProducts)

    };

    render() {
        return (
            <div>
                <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)}
                              onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)}
                              products={this.state.products} filterText={this.state.filterText}
                              settings={this.props.settings}
                />
            </div>
        );

    }

}

class ProductTable extends React.Component {

    render() {
        var onProductTableUpdate = this.props.onProductTableUpdate;
        var rowDel = this.props.onRowDel;
        let rowAdd = this.props.onRowAdd
        var filterText = this.props.filterText;
        let settings = this.props.settings
        var product
        let volumeArr
        let final_quantity = 0, final_weight = 0, final_volume = ''
        const {products} = this.props
        if (products !== undefined) {
            product = this.props.products.map(function (product) {
                return (<ProductRow
                    onProductTableUpdate={onProductTableUpdate}
                    product={product}
                    onDelEvent={rowDel.bind(this)}
                    key={product.id}
                    settings={settings}
                    rowAdd={rowAdd.bind(this)}
                />)
            });

            volumeArr = products.map(item => {
                return volume(item.width, item.height, item.length, item.weight, settings.tariff_summ)
            })

            for (let i = 0; i < products.length; i++) {
                final_quantity += parseInt(products[i].quantity)
                final_weight += parseInt(products[i].weight)
                final_volume += volumeArr[i]
            }
        }


        return (
            <div>
                <table className="table table-bordered product-table">
                    <thead>
                    <tr>
                        <th>Описание вложимого</th>
                        <th colSpan={3} style={{
                            width: '25%'
                        }}>Габариты см
                        </th>
                        <th>Кол-во мест</th>
                        <th>Вес кг</th>
                        <th>Обьемный вес, кг</th>
                        <th className="add-btn">
                            <input type="button" onClick={this.props.onRowAdd} value="+"/>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {product}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td style={{
                            visibility: 'hidden'
                        }}>

                        </td>
                        <td style={{
                            visibility: 'hidden'
                        }}>

                        </td>
                        <td style={{
                            visibility: 'hidden'
                        }}>

                        </td>
                        <td style={{
                            visibility: 'hidden'
                        }}>

                        </td>
                        <td className={'result'}>
                            Итого мест <b>{final_quantity ? final_quantity : 0}</b>
                        </td>
                        <td className={'result'}>
                            Общий вес <b>{final_weight ? final_weight : 0}</b>
                        </td>
                        <td className={'result'} colSpan="2">
                            Итого обьемный вес <b>{final_volume && final_volume}</b>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        );

    }

}

function volume(width, height, length, weight, tariff_summ) {
    let volume = 0;
    let result = ''
    if (width > 0 && height > 0 && length > 0 && tariff_summ > 0 && tariff_summ !== undefined) {
        // console.log('asas')
        volume = width * height * length / parseInt(tariff_summ);
            result = volume&&volume.toFixed(2)
        // if (volume > weight) {
        // } else {
        //     result = Math.ceil(weight)
        // }
    }
    return result
}

class ProductRow extends React.Component {
    onDelEvent() {
        this.props.onDelEvent(this.props.product);

    }

    render() {
        const {width, height, length, weight} = this.props.product
        let result = volume(width, height, length, weight, this.props.settings.tariff_summ)
        return (
            <tr className="eachRow">
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    "type": "title",
                    value: this.props.product.title,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "width",
                    value: this.props.product.width,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "height",
                    value: this.props.product.height,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "length",
                    value: this.props.product.length,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "quantity",
                    value: this.props.product.quantity,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "weight",
                    value: this.props.product.weight,
                    id: this.props.product.id
                }}/>
                <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
                    type: "total_weight",
                    value: result,
                    readOnly: true,
                    id: this.props.product.id
                }}/>
                <td className="del-cell">
                    <input type="button" onClick={this.onDelEvent.bind(this)} value="x" className="del-input"/>
                </td>
            </tr>

        );

    }

}

class EditableCell extends React.Component {

    render() {
        return (
            <td>
                <input type='text' name={this.props.cellData.type} id={this.props.cellData.id}
                       value={this.props.cellData.value} onChange={this.props.onProductTableUpdate}
                       readOnly={this.props.cellData.readOnly}
                />
            </td>
        );

    }

}

const mapsStateToProps = state => {
    return {
        products: state.orderProduct.products,
        tarifList: state.orderProduct.tarifList,
        methodList: state.orderProduct.methodList,
        settings: state.orderProduct.settings
    }
}
const mapsDispatchProps = dispatch => {
    return {
        addRow: (data) => dispatch(addRow(data)),
        deleteRow: (data) => dispatch(removeRow(data)),
        fillRow: (data) => dispatch(fillTable(data))
    }
}
export default connect(mapsStateToProps, mapsDispatchProps)(TableList)
