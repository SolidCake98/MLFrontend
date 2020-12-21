import React, { Component  } from "react";
import {Search, FilterList} from "@material-ui/icons";
import {Dropdown} from "react-bootstrap";
import DataSetService from "../../services/DataSetService";
import {Close} from "@material-ui/icons";


import "./DataSet.css";

export default class SearchHead extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      tag: '',

      typingTimeout: 0,
      typingTimeoutTag: 0,

      showFilter: false,
      showTags: false,
      tags: null,
      addedTags: []
    }

    this.handleChange= this.handleChange.bind(this);

    this.CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
      <div
        ref={ref}
        className="button-toggle"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </div>
    ));
  }

  handleChange = (event) => {

    const self = this;

    if (self.state.typingTimeout) {
       clearTimeout(self.state.typingTimeout);
    }

    self.setState({
       title: event.target.value,
       typingTimeout: setTimeout(function () {
           self.search(self.state.title);
         }, 500)
    });
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

  search = (title) => {
    if(title)
      DataSetService.getDatasetsByTitle(title).then(
        response => {
            this.props.onSearch(response.data);
        }
      );
    else
      DataSetService.getNewDatasets().then(
        response => {
            this.props.onSearch(response.data);
        }
      );
  }

  searchByTag = () => {
    const tags = this.state.addedTags;
    this.setState({
      showTags: false,
      showFilter: false
    });
    
    if(tags.length !== 0){
      DataSetService.getDatasetsByTags(tags).then(
        response => {
          this.props.onSearch(response.data)
        }
      )
    } else {
      DataSetService.getNewDatasets().then(
        response => {
          this.props.onSearch(response.data)
        }
      )
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
              tags: response.data.filter(item => !this.state.addedTags.includes(item.tag_name)),
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
    const{addedTags} = this.state;
    return (
      <>
        <div className="flex">
          <div className="search-main">
            <Search className="icon-search"/>
            <input className="search-input" placeholder="Search datasets" onChange={this.handleChange}/>
            <div className="filter-search" >
              <Dropdown className="filter-button" show={this.state.showFilter}>
                <Dropdown.Toggle as={this.CustomToggle} id="dropdown-basic" onClick={
                  () => this.setState({showFilter: !this.state.showFilter})
                }>
                  <FilterList />
                </Dropdown.Toggle>
                <Dropdown.Menu className="filter-menu-main" id="main">
                  <div style={{marginBottom:8, fontSize:10, fontWeight:600}}>
                    TAGS
                  </div>

                  <div className="flex">
                    <div className="search-tags">
                      <Search className="icon-search-tags" style={{ fontSize: 20 }}/>
                      <input className="search-input" style={{ paddingLeft: 35 }} onChange={this.handleChangeTags} placeholder="Search"/>
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
                    <button className="apply-button" onClick={this.searchByTag}>
                      <span className="text-in-apply-button"> Apply </span>
                    </button>
                  </div>

                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </>
    );
  }


}