import React, { Component } from 'react';
import { Folder, FolderOpen, InsertDriveFile, KeyboardArrowDown, KeyboardArrowRight } from '@material-ui/icons';
import DataSetDirList from './DataSetDirList';

export default class DataSetDirItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
      is_open: false,
      is_loading: false,
			types: {
				'directory': <Folder />,
				'file': <InsertDriveFile />
      },
		}
  }
  
  onClick(){
    if (this.props.type === 'directory'){
      this.setState({
        is_open: !this.state.is_open,
        is_loading: !this.state.is_open,
      })
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
              is_loading ? (<> <span className="spinner-border spinner-border-sm"/> <FolderOpen/></>) :
              is_open ?(<><KeyboardArrowDown/><FolderOpen/></>) : (<><KeyboardArrowRight/><Folder/></>)) :
            (<>{types[this.props.type]} </>)
          }

          <p className="text">{this.props.name}</p>
        </div>

        {is_open && (
          <DataSetDirList path={this.props.path + "/" + this.props.name} className="next-ul" updateLoading={this.updateLoading}/>
        )}

      </ul>
      )
    }
  }