import React from "react";
import ReactDOM from "react-dom";
import Web3 from 'web3';
import LoomTruffleProvider from 'loom-truffle-provider';
import {CryptoUtils, Client, LoomProvider, LocalAddress} from 'loom-js';
import utf8 from 'utf8';


const LOOM_SERVER = '192.168.2.25:46658';  //local loom-host
//const LOOM_SERVER = '127.0.0.1:46658';  //localhost
//const LOOM_SERVER = 'extdev-plasma-us1.dappchains.com:80'; //loom testnet


export default class LoomTest extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      privateKey: null,
      publicKey: null,
      client: null,
      web3: null
    }
  }

  componentDidMount(){
    const tempClient = this.getClient();
    this.setState({
      client:tempClient
    });
  }


  //var extdev = new Web3('extdev-plasma-us1.dappchains.com);

  getClient = () => { 
    const client = new Client(
      'default',
      `ws://${LOOM_SERVER}/websocket`,
      `ws://${LOOM_SERVER}/queryws`,
    )
    return client;
  }


  setKeys = () => { 
    let tempPrivateKey = require('./../../smart-contract/2/priv_key');
    const utfPrivateKey = utf8.encode(tempPrivateKey);
    const tempPublicKey = CryptoUtils.publicKeyFromPrivateKey(utfPrivateKey);
    this.setState({
      privateKey:tempPrivateKey,
      publicKey:tempPublicKey
    })

  }

  setVal = async(val) => {
    console.log("setVal():" + val);

    this.setKeys();

    const web3 = new Web3(new LoomProvider(this.state.client, this.state.privateKey));
    const ABI = [{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

    // Getting our address based on public key
    const fromAddress = LocalAddress.fromPublicKey(this.state.publicKey).toString();
    console.log("fromAddress:" + fromAddress);

    // Get the contract address (we don't need to know the address just the name specified in genesis.json
    ////const contractAddress = '0x7c40eFe4E2E980C0236adBa8032430901680339E';

// Instantiate the contract and let it ready to be used

  const loomContractAddress = await this.state.client.getContractAddressAsync('SimpleStore');
  
  //console.log("loomContractAddress:" + loomContractAddress);

    // Translate loom address to hexa to be compatible with Web3
  const contractAddress = CryptoUtils.bytesToHexAddr(loomContractAddress.local.bytes);
   //const contractAddress = '0x7c40eFe4E2E980C0236adBa8032430901680339E';     
   console.log("contractAddress:" + contractAddress);

    // Instantiate the contract
    const contract = new web3.eth.Contract(ABI, contractAddress, {from: fromAddress});
    console.log("contract:" + contract);

/*
    // Listen for new value set
    contract.events.NewValueSet({}, (err, newValueSet) => {
      if (err) {
        console.error('error', err)
        return
      }

      console.log('New value set', newValueSet.returnValues)
    })
*/
    console.log("sending val...");
    await contract.methods.set('47').send();
    console.log("retrieving val...");
    const result = await contract.methods.get().call();
    console.log("result from loom get:" + result);
  }


  handleRegenPk = e => {
    console.log("handleRegenPk");
  }

  handleLoomTestStore = e => {
    console.log("handleLoomTestStore");
  }

  handleLoomTestRetrieve = e => {
    console.log("handleLoomTestRetrieve");
    this.setVal(11);
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
