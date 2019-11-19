import React, { Component } from 'react'

import axios from 'axios'

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
          console.log(result.data)
          this.setState({
            userData: [
              {
                user: info.login,
                userId: info.id,
                photo: info.avatar_url,
                bio: info.bio,
                followers: info.followers
              }
            ]
          })

          // let kk = this.state.userData.map( k => {
          //   return k
          // })
          
          // return kk;

        }).catch( error => console.log( error ))
      }
  render() {

    let kk = this.state.userData.map( k => {
      console.log(k)
      return (
        <div key={k.userId}>
          <h1>{k.user}</h1>
          <p>{k.userId}</p>
          <img src={k.photo}/>
          <p>{k.bio}</p>
          <p>{k.followers}</p>
        </div>
      )
    })

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} value={this.state.username} />
          <button type="submit">Submit</button>
        </form>
      {kk}
      </div>
    )
  }
}

export default App;