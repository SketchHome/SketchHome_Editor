import React, { Component } from "react";

import './ItemList.css';

// import box from '../../../image/box.png';
// import item1 from '../../../image/item1.png';
import human from '../../../image/human.png';

const item_list = [
    { key: 'human_0', image_src: human, name: 'Human'},
    { key: 'human_1', image_src: human, name: 'Human'},
    { key: 'human_2', image_src: human, name: 'Human'},
    { key: 'human_3', image_src: human, name: 'Human'},
    { key: 'human_4', image_src: human, name: 'Human'},
]

/*
 * 위 컴포넌트는 아이템 리스트입니다. 
 */
class ItemList extends Component {
    dragStart(e) {
        console.log('yes')
    }

    dragEnd(e) {
        console.log('no')
    }

    render() {
        return (
            <div className="item_list_wrapper">
                <table>
                    <tbody>
                        {item_list.map(item =>
                            <tr key={item.key}>
                                <td className="td_image">
                                    <div className="ImageWrapper">
                                        <img
                                            className="ItemImage"
                                            draggable='true'
                                            onDragStart={this.dragStart.bind(this)}
                                            onDragEnd={this.dragEnd.bind(this)}
                                            src={item.image_src} alt={item.key} />
                                    </div>
                                </td>
                                <td className="td_image">
                                    <div className="ImageWrapper">
                                        <img
                                            className="ItemImage"
                                            draggable='true'
                                            onDragStart={this.dragStart.bind(this)}
                                            onDragEnd={this.dragEnd.bind(this)}
                                            src={item.image_src} alt={item.key} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ItemList;
