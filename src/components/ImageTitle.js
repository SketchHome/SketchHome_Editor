import React, {Component} from'react';
import './index.css';

class ImageTitle extends Component {
    render() {
        const { Images, type , detail} = this.props;
        return (
            <div className="imagetitle">
                <div className={ type }><img src={ Images } className="btnImage_put_top"/></div>
                <div className="btnImage_put_buttom">{ detail }</div>
            </div>      
        );
    }
}
            
export default ImageTitle;