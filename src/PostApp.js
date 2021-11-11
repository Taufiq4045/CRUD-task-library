import React from "react";
import axios from "axios";
import './PostApp.css';

import {Table, Button} from "react-bootstrap";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

class PostApp extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            posts: [],
            id:"",
            userId: "",
            body: "",
            title:"",
        };
    }

    // CREATE OPERATION
    createPost = async () => {
        console.log(this.state);
        try{
            const { userId, title, body} = this.state;
            const {data:post} = await axios.post(API_URL, {
                userId,
                title,
                body,
            });
            const posts = [...this.state.posts];
            posts.push(post);
            this.setState({posts, userId:"", title:"", body:"",});
            console.log(posts);
        }catch(error) {
           console.error("Error creating data from server", error);
        }
    };

    //READ OPERATION 
    getPosts =async () => {
        try{
            const {data:posts} = await axios.get(API_URL);
            console.log(posts);
            this.setState({posts});
        }catch(error) {
           console.error("Error fetching data from server", error);
        }
    };

    //UPDATE OPERATION
    updatePost = async () => {
        try{
            const { id, userId, title, body} = this.state;
            const {data:post} = await axios.put(`${API_URL}/${id}`, {
                userId,
                title,
                body,
            });
            const posts = [...this.state.posts];
            const index = posts.findIndex((p) => p.id === id);
            posts[index] = post;
            this.setState({posts, userId:"", title:"", body:"",});
        }catch(error) {
           console.error("Error creating data from server", error);
        }  
    };

    //DELETE OPERATION
    deletePost = async (postId) => {
        console.log(postId);
        try{
            await axios.delete(`${API_URL}/${postId}`);
            let posts = [...this.state.posts];
            posts = posts.filter((post) => post.id !== postId);
            this.setState({posts});
            }catch(error) {
           console.error("Error deleting data from server", error);
        }
    };

    componentDidMount() {
        this.getPosts();
    }

    handleChange = ({ target : {name, value}}) => {
        this.setState({ [ name ] : value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.id) {
            this.updatePost();
        }else{ this.createPost();}
    }

    
    render() {
        return (
            <>
            <div className="container">
            <h3>Post App</h3>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>User Id : </label>
                    <input
                    name="userId"
                     type="text"
                     value={this.state.userId}
                     onChange={this.handleChange}
                     required />
                </div>
                <br />
                <div>
                    <label>Title : </label>
                    <input 
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange ={this.handleChange}
                    required />
                </div>
                <br />
                <div>
                    <label>Body : </label>
                    <input 
                    name="body"
                    type="text"
                    value={this.state.body}
                    onChange ={this.handleChange}
                    required />
                </div>
                <br />
                <div>
                    <Button variant="primary" size="md" type="submit">Submit</Button>
                </div>
            </form>
            </div>
            <br />
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Post Id</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.posts.map(post => {
                    return (
                        <tr key={post.id}>
                            <td>{post.userId}</td>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                            <td>
                            <Button variant="success" onClick= {() => this.setState({...post})}>Update</Button>
                            <Button variant="danger" onClick= {() => this.deletePost(post.id)}>Delete</Button>
                             </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            </>
        );
    }
}

export default PostApp;