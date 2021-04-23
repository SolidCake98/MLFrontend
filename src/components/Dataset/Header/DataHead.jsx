import React, { Component } from "react";
import "./DataHead.css";
import ModalDatasetCreate from "./ModalDatasetCreate";

export default class DataHead extends Component {

  constructor(props) {
    super(props);


    this.onCloseModal = this.onCloseModal.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);

    this.state = {
      width: 0,
      height: 0,
      showModal: false,
    }

    this.ref = React.createRef();
    this.refChild = React.createRef();
  }

  onOpenModal() {
    this.setState({
      showModal: true,
    });
  }

  onCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ 
      width: this.ref.current.offsetWidth,
      height: this.refChild.current.offsetHeight});
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ 
      width: this.ref.current.offsetWidth,
      height: this.refChild.current.offsetHeight, 
    });
  };

  render() {
    const {width, height, showModal} = this.state;
    return (
      <>
      <ModalDatasetCreate show={showModal} onClose={() => this.onCloseModal()} path={this.props.path}/>
      <div className="data-header-container">
        <div className="pageheader">
          <div className="data-header" ref={this.ref}>
            <div className="data-image-container">
              <img className="img-header"
              alt="header"
              src="https://storage.googleapis.com/kaggle-datasets-images/1174383/1966752/98726f886100474fef189d75c689893d/dataset-cover.jpg?t=2021-02-22-08-28-58"/>
            </div>

            <div className="page-header-top">
              <div className="data-header-info">

                <h1 className="data-header-tittle">
                  {this.props.tittle}
                </h1>
                <h2 className="dataset-header-subtitle">
                  {this.props.tittle}
                </h2>
            
              </div>
              <div className="data-header-details">
                <div className="data-header-col_wrapper">
                  <img className="data-header-owner-thumbnail" alt="profile" src="http://localhost:5000/api/v1/user/media/default"/>
                  {this.props.username}
                </div>

                <div style={{marginLeft: 20}}>
                  {this.props.size} {this.props.size_name}
                </div>

                <div>
                  <time dateTime={this.props.date_load}>
                    <span>&nbsp; • &nbsp;</span>
                    <span> created {this.props.since_create} ago </span>
                  </time>
                </div>
              </div>

              </div>
            </div>
          </div>

          <div style={{width: width, height: height}}>
            <div className="page-header-bottom" ref={this.refChild}>
              <div className="overflow-bottom-l" >
              <div className="overflow-bottom">
                <nav className="page-header-nabbar">
                  <div className="page-header-nabbar_wrapper">
                    <a href="/" className="page-header-links page-header-links-selected">
                      <span>
                        Data
                      </span>
                    </a>

                    <a href="/" className="page-header-links">
                      <span>
                        Datasets
                      </span>
                    </a>

                    <a href="/" className="page-header-links">
                      <span>
                        Charts
                      </span>
                    </a>

                    <a href="/" className="page-header-links">
                      <span>
                        Dashboards
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
              </div>
              <div className="page-header-buttons">
                <a href={this.props.url_download}>
                  <button className="white-apply-button " style={{marginRight: 8}}>
                    <span className="text-in-white-apply-button">
                      Download
                    </span>
                  </button>
                </a>
                <button className="apply-button" onClick={this.onOpenModal}>
                  <span className="text-in-apply-button">
                    New dataset
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
  }
}