import React, {Component} from'react';
import './index.css';

class ImageTitle extends Component {
    render() {
        const {detail} = this.props;
        return (
            <div className="imagetitle">
                <div className="detail_btn"><a href="ExplainDetail">{ detail }</a></div>
            </div>      
        );
    }
}
            
export default ImageTitle;