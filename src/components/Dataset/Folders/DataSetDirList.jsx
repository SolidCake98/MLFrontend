import React, { Component } from 'react';
import DataSetService from '../../../services/DataSetService';
import DataSetDirItem from "./DataSetDirItem";

export default class DataSetDirList extends Component {

  constructor(props) {
    super(props);
    this.loadNext = this.loadNext.bind(this);
    this.state = {
      dirList: null,
      loading:false,
    }

    this.filter = this.props.filter;
  }

  componentDidMount() {
    DataSetService.readDirDataset(this.props.path, 0, this.filter).then(
      response => {
        this.setState({
          dirList: response.data,
          loading: false,
        });
        if (this.props.updateLoading)
          this.props.updateLoading(false);
      });
  }

  loadNext(){
    this.setState({
      loading:true,
    });

    DataSetService.readDirDataset(this.props.path, this.state.dirList.next_pos, this.filter).then(
      response => {
        const lst = this.state.dirList;
        lst.next_pos = response.data.next_pos;
        lst.count = response.data.count;
        lst.dir = lst.dir.concat(response.data.dir)
        this.setState({
          dirList: lst,
          loading:false,
        });
    });
  }

  render() {
    const {dirList, loading} = this.state;
    return (
      <>
      {
        this.state.dirList ? (
          <ul style={{display: "block"}} className={this.props.className}>
            {dirList.dir.map((item) => ( 
              <DataSetDirItem type={item.type} name={item.name} clickOnFile={this.props.clickOnFile} path={this.props.path} key={item.id} className={this.props.className} filter={this.props.filter}/>
            ))}
            {dirList.count > 0 &&(
              <div>
                <button className= {this.props.className + ' btn'}  onClick={this.loadNext}>
                {loading ? (<span className="spinner-border spinner-border-sm"/>) :
                  ( <>...</>)}
                {dirList.count} more
                </button>  
              </div>
            )}
          </ul>
        ):(
          <div/>
        )
      }  
    </>
    )
  }

}