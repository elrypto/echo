import React from "react";
import ReactDOM from "react-dom";



export default class LoomTest extends React.Component {

  handleRegenPk = e => {
    console.log("handleRegenPk");
  }

  handleLoomTestStore = e => {
    console.log("handleLoomTestStore");
  }

  handleLoomTestRetrieve = e => {
    console.log("handleLoomTestRetrieve");
  }



  render(){
    return(
      <div>
        <p>loom test</p>
        <button class="btn btn-secondary" onClick={this.handleRegenPk}>
              Re/Generate PK Value in File</button>
        <button class="btn btn-secondary" onClick={this.handleLoomTestStore}>
              Store TestVal to LOOM</button>
        <button class="btn btn-secondary" onClick={this.handleLoomTestRetrieve}>
          Retrieve TestVal from LOOM (console)</button>
      </div>
    );
  }


 /* constructor() {
    super()
    this.contract = new Contract()
    this.state = {
      posts: [],
      user: null,
      ready: false
    }
  }

  async updatePostsAndComments() {
    let posts = []
    try {
      posts = await getIndexed('posts')
    } catch(err) {
      console.error('Cannot retrieve posts, maybe no post exists yet')
    }

    let comments = []
    try {
      comments = await getIndexed('comments')
    } catch(err) {
      console.warn('No comments')
    }

    posts = posts.map(post => {
      comments.forEach(comment => {
        if (post.postId == comment.postId) {
          post.comments = post.comments || []
          post.comments = post.comments.sort((a, b) => +a.commentId < +b.commentId)
          post.comments.push(comment)
        }
      })

      return post
    })

    posts = posts.sort((a, b) => +a.postId < +b.postId)
    this.setState({posts})
  }

  async componentDidMount() {
    await this.contract.start()
    this.setState({user: this.contract.getUser()})
    this.intervalHandler = setInterval(() => {
      this.updatePostsAndComments()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalHandler)
  }

  async newPost(text) {
    const tx = await this.contract.newPost(text)
    console.log('New Post Sent', tx, text)
  }

  async sendComment(postId, text) {
    const tx = await this.contract.newComment(postId, text)
    console.log('New Comment Sent', tx, text)
  }

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <li className="list-group-item" key={index} >
          <Post value={post} sendComment={(postId, text) => this.sendComment(postId, text)} />
        </li>
      )
    })

    const MT10 = {
      marginTop: '10px'
    }

    return (
      <div className="container">
        <h5 style={MT10}>
          <label>Hello: {this.state.user}</label>
        </h5>
        <div style={MT10}>
          <Text onTextEntry={(text) => this.newPost(text)} ></Text>
        </div>
        <div>
          <ul className="list-group" style={MT10}>
            {posts}
          </ul>
        </div>
      </div>
    )
  }*/
}
