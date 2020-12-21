import React, { Component } from "react";
import "./DataSet.css";
import AuthService from "../../services/AuthService";
import {ListGroup, ListGroupItem, Button, Dropdown, DropdownButton} from "react-bootstrap";
import DataSetService from "../../services/DataSetService";


export default class DataSetRating extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      user: AuthService.getCurrentUser(),
      selectedRating: null,
      commentary: null,
      ratings: this.props.ratings,
    }
  }


  onSelectRating = (i) => {
    this.setState({
      selectedRating: i,
    })
  }

  onWriteCommentary = (e) => {
    this.setState({
      commentary: e.target.value,
    })
  }

  onSend = () => {
    console.log(this.state.commentary);
    DataSetService.sendRating(this.props.dId, this.state.commentary, this.state.selectedRating).then(
      response => {
        // this.setState(state => {
        //   const newRating = {'user':{'username': this.state.username}, 'username':state.username, 'since_created':'now', 'commentary': state.commenatary, 'rating':state.rating}
        //   const ratings = [...this.state.ratings, newRating]
        //   return {
        //     ratings
        //   }
        // })
        document.location.reload();
      }
    )
  }

  render() {
    const ar = Array.apply(null, {length: 10}).map(Number.call, Number);
    return (
      <div>

        {this.state.user && this.state.user.id !== this.props.duId &&(
          <div className="content-box">
            <div className="rating-title">
              Leave your rewiew:
            </div>
            <div className="rating-title">
              <div>
                Comment: <textarea style={{width: "100%"}} onChange={this.onWriteCommentary}/>
              </div>
              <div>
                <div className="choose-rating">
                  <span style={{marginRight: 10}}>Choose rating: </span>
                  <span style={{marginRight: 10}}> {this.state.selectedRating} </span>

                  <div>
                    <DropdownButton title="Rating">
                      {ar.map((i) =>
                        <Dropdown.Item onClick={() => this.onSelectRating(i+1)}>{i + 1}</Dropdown.Item>
                      )}
                    </DropdownButton>
                  </div>
                </div>
                
                <Button onClick={this.onSend}>Send</Button>
              </div>
            </div>
          </div>
        )}
        <div className="content-box">
        <div className="rating-title">
          Ratings:
        </div>
          <ListGroup variant="flush">
            {this.state.ratings.length !== 0 && (
              <>
                {this.state.ratings.map(i => 
                  <ListGroupItem>
                    <div> {i.user.username} </div>
                    <div> {i.since_created} ago</div>
                    <div>{i.commenatary}</div> 
                    <div> Rating: {i.rating} </div>
                  </ListGroupItem>)}
              </>
            )}
          </ListGroup>
        </div>
        
        
      </div>
    )
  }
}