import React, { Component } from 'react'
import axios from 'axios'
import { Navbar, Nav, Form, Button, FormControl, Image, ListGroup } from 'react-bootstrap'
import alertify from 'alertifyjs'
class App extends Component {

      constructor(props){
            super(props);
            this.state = {
              username: '',
              userData: []
            }
            
            this.handleChange = this.handleChange.bind(this)
            this.handSubmit = this.handleSubmit.bind(this)
      }

      handleChange = e => {
        this.setState({
          username: e.target.value
        })
      }
      
      handleSubmit = e => {
        e.preventDefault();

        axios.get(`https://api.github.com/users/${this.state.username}`)
        .then( result => {
          
          let info = result.data;
          console.log(result)
          
          this.setState({
            username: '',
            userData: [
              {
                username: info.login,
                name: info.name,
                user_url: info.html_url,
                userId: info.id,
                photo: info.avatar_url,
                bio: info.bio,
                followers: info.followers,
                following: info.following,
                email: info.email,
                hireable: info.hireable,
                location: info.location,
                public_repo: info.public_repos
              }
            ]
          })

        }).catch( error => {
          // alert('Invalid User')
          alertify.alert('Error',"No user found!");
        })
      }

    
      
  render() {
    return (
      <div>
        {/* Navbar with the search form */}
        <Navbar bg="dark" variant="dark" className="justify-content-center">
          <Nav className="justify-content-center" id="navbar">
            <Form onSubmit={this.handleSubmit} inline>
              <FormControl type="text" onChange={this.handleChange} value={this.state.username} className="mr-sm-2"/>
              <Button variant="outline-info" type="submit">Search</Button>
            </Form>
          </Nav>
        </Navbar>

        {/* the user data will appear below this comment */}
        {
          this.state.userData.map( data => {
            // conditional statements
            if(data.name === null){
              data['name'] = 'N/A'
            }

            if(data.email === null){
              data['email'] = 'N/A'
            }

            if(data.bio === null){
              data['bio'] = 'N/A'
            }

            if(data.location === null){
              data['location'] = 'N/A'
            }

            if(data.hireable === null){
              data['hireable'] = 'N/A'
            }else if(data.hireable === true){
              data['hireable'] = 'Yes'
            }else{
              data['hireable'] = 'No'
            }

            return (
              <div key={data.userId} className="container user-profile">
                  <label>Id: {data.userId}</label>
                  <Image src={data.photo} rounded id="profile-photo" />

                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <span className="data-label">
                        Username:
                      </span>
                      {data.username}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Name:
                      </span>
                      {data.name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Bio:
                      </span>
                      {data.bio}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Location:
                      </span>
                      {data.location}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        URL:
                      </span>
                      {data.user_url}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Email:
                      </span>
                      {data.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Followers:
                      </span>
                      {data.followers}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Following:
                      </span>
                      {data.following}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        No. of Repos:
                      </span>
                      {data.public_repo}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span className="data-label">
                        Hireable:
                      </span>
                      {data.hireable}
                    </ListGroup.Item>
                  </ListGroup>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default App;