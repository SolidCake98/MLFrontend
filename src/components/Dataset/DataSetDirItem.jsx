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
				'directory': <Folder style={{ fontSize: 18 }}/>,
				'file': <InsertDriveFile style={{ fontSize: 18 }}/>
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
              is_loading ? (<> <span className="spinner-border spinner-border-sm"/> <FolderOpen style={{ fontSize: 24 }}/></>) :
              is_open ?(<><KeyboardArrowDown style={{ fontSize: 24 }}/> <FolderOpen style={{ fontSize: 24 }}/></>) : 
              (<><KeyboardArrowRight style={{ fontSize: 24 }}/><Folder style={{ fontSize: 24 }}/></>)) :
            (<>{types[this.props.type]} </>)
          }

          <p className="text">{this.props.name}</p>
        </div>

        {is_open && (
          <DataSetDirList path={this.props.path + "/" + this.props.name} clickOnFile={this.props.clickOnFile}  className="next-ul" updateLoading={this.updateLoading}/>
        )}

      </ul>
      )
    }
  }