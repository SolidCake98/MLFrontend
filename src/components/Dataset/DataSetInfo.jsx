import React, { Component } from "react";
import "./DataSet.css";
import AuthService from "../../services/AuthService";
import DataSetService from "../../services/DataSetService";
import {Search, Close} from "@material-ui/icons";


export default class DataSetInfo extends Component {

  constructor(props){
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(),
      addedTags: [],
      showTags: false,
      tags: null,
      datasetTags: this.props.tags.map(i => i.tag.tag_name),
    }
  }

  handleChangeTags = (event) => {

    const self = this;

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeoutTag);
    }

    self.setState({
       title: event.target.value,
       typingTimeoutTag: setTimeout(function () {
           self.searchTags(self.state.title);
         }, 500)
    });
  }

  addTags = () => {
    if(this.state.addedTags.length !== 0){
      DataSetService.addTags(this.props.dId, this.state.addedTags).then(
        response => {
            this.setState( state => {
              const showTags = false;
              const datasetTags = [...state.datasetTags, ...state.addedTags];
              const addedTags = [];
              
              return {
                addedTags,
                showTags,
                datasetTags
              }
            });
        }
      );
    }
  }

  onAddTag = (tag) => {
    this.setState(state => {
      const addedTags = [...state.addedTags, tag];
      const showTags = false;
      return {
        addedTags,
        showTags
      }
    })
  }

  onDeleteTag = (id) => {
    this.setState(state => {
      const addedTags = state.addedTags.filter((item, j) => id !== j);;
      return {
        addedTags
      }
    });
  }
  
  searchTags = (tag) => {
    if(tag)
      DataSetService.getTagsByName(tag).then(
        response => {
            this.setState({
              tags: response.data.filter(item => !this.state.addedTags.includes(item.tag_name) 
              && !this.state.datasetTags.includes(item.tag_name)),
              showTags: true,
            });
        }
      );
    else
      this.setState({
        showTags: false
      });
  }

  render() {
    const {addedTags} = this.state;
    return (
      <>
        {this.state.user && this.props.duId === this.state.user.id && (
          <div className="content-box">
            <div style={{margin: (10, 10 , 10, 10)}}>
              <div style={{marginBottom:8, fontSize:10, fontWeight:600}}>
                ADD TAGS
              </div>
            
              <div className="flex">
                <div className="search-tags">
                  <Search className="icon-search-tags" style={{ fontSize: 20 }}/>
                  <input className="search-input" style={{ paddingLeft: 35 }}
                  onChange={this.handleChangeTags} placeholder="Search"/>
                </div>
              </div>
              {this.state.showTags && ( 
                  <div className="filter-menu-tag">
                    <div style={{paddingTop: 5}}>
                      {this.state.tags.map(item => (
                        <div className="tag-list-item" onClick={() => this.onAddTag(item.tag_name)}>
                          {item.tag_name}
                        </div>  
                      ))}
                    </div>
                  </div>
              )}
              <div className="added-tags">
                {this.state.addedTags.length !== 0 && (
                  <>
                    {addedTags.map((item, index) => (
                      <div className="added-tag-el">
                        <span className="add-tag-text">
                          {item}
                        </span>
                        <Close style={{fontSize: 16}} onClick={() => this.onDeleteTag(index)}/>
                      </div>
                    ))}
                  </>
                )}
              </div>
            
            <div className="tag-apply-list">
              <button className="apply-button" onClick={this.addTags}>
                <span className="text-in-apply-button"> Apply </span>
              </button>
            </div>
          </div>
          </div>
        )}
        
        <div className="content-box">
          <div className="quick-info" >
            <div>
              Rating {this.props.rating}
            </div>
            <div>
              Size {this.props.size} {this.props.size_name}
            </div>
            <div className="quick-info-tags">
              <div className="text-tags">
                Tags
              </div>
              {this.state.datasetTags.length !== 0 ? ( 
                <div>
                {
                  this.state.datasetTags.map((i, index) => 
                    <div className="text-info-tags" key={index}>
                      {i},
                    </div>
                  )
                }
              </div>
            ) : (<div>None</div>)}
            </div>
          </div>
        </div>
      </>
    )
  }
}