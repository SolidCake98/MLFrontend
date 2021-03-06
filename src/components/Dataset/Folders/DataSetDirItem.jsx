import React, { Component } from 'react';
import { FolderOutlined, FolderOpen, InsertDriveFileOutlined, KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import DataSetDirList from './DataSetDirList';

export default class DataSetDirItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
      is_open: false,
      is_loading: false,
			types: {
				'directory': <FolderOutlined style={{ fontSize: 18 }}/>,
				'file': <InsertDriveFileOutlined style={{ fontSize: 18 }}>Rounded</InsertDriveFileOutlined>
      },
		}
  }
  
  onClick(){
    if (this.props.type === 'directory'){
      this.setState({
        is_open: !this.state.is_open,
        is_loading: !this.state.is_open,
      })  
    } else {
      this.props.clickOnFile(this.props.name, this.props.path + "/" + this.props.name);
    }
  }

  updateLoading = (value) => {  
    this.setState({ is_loading: value });
  }

	render() {
		const {types, is_open, is_loading} = this.state
		return (
      <ul style={{display: "block"}} className={this.props.className}>
        <div onClick={() => this.onClick()} className="element">
          
          {this.props.type === "directory" ? 
            (
              is_loading ? (<> <span className="spinner-border spinner-border-sm"/> <FolderOpen style={{ fontSize: 18 }}/></>) :
              is_open ?(<><KeyboardArrowDown style={{ fontSize: 18 }}/> <FolderOpen style={{ fontSize: 18 }}/></>) : 
              (<><KeyboardArrowRight style={{ fontSize: 18 }}/><FolderOutlined style={{ fontSize: 18 }} /></>)) :
            (<>{types[this.props.type]} </>)
          }

          <p className="text">{this.props.name}</p>
        </div>

        {is_open && (
          <DataSetDirList path={this.props.path + "/" + this.props.name} clickOnFile={this.props.clickOnFile}  className="next-ul" updateLoading={this.updateLoading} filter={this.props.filter}/>
        )}

      </ul>
      )
    }
  }