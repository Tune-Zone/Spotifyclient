import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { useParams } from "react-router";
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        backgroundColor: 'black',

        '& img':{
            width: '25%'
        },

        '& a':{
            borderRadius: '99px',
            backgroundColor: '#1db954',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
        },

        '& a:hover':{
            backgroundColor:' white',
            borderColor: '#1db954',
            color: '#1db954',
        }
    },
    words:{
        color: 'white',    
    },
    backc:{
        backgroundColor: 'black',
        color: 'black'
      },
    spot:{
        backgroundColor: 'lightblue'
    }
});
const Posts = () => {
    const [posts, setPosts] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        axios
          .get("https://tunezoneinfo.herokuapp.com/api/posts")
          .then((response) => {
            setPosts(response.data);
            window.history.pushState({}, null, "/posts");
          })
          .catch((err) => {
            console.log(err)
          });
      });
      let { track,accessToken } = useParams();
    return (
        <div>
            <div className={classes.login}>
            <h1 style={{color:"white"}}>Select Songs for Remix</h1>
            <div className="row">
            {posts.map((post, i) => {
                const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                const posterName = post.postedBy ? post.postedBy.name : "Unknown"
                return (
                    <div> 
                    <div className="card col-md-11" key = {i}>
                        <div className="card-body">
                            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                            alt="default"
                            className= "img-thumbnail mb-3"
                            style={{height: "100px",width:"50%"}} 
                            />
                            <img src={`https://tunezoneinfo.herokuapp.com/api/post/photo/${post._id}`}
                            className= "img-thumbnail mb-3"
                            style={{height: "100px",width:"50%"}} 
                            />
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body.substring(0,50)}...</p>
                            <br />
                            <p className="font-italic mark">
                                posted by <a>{posterName}</a>{" "}
                                on {new Date(post.created).toDateString()}
                            </p>
                            <Link to={`/remix/${track}/${post._id}/${accessToken}`}>CREATE REMIX</Link>                       
                        </div>
                       
                    </div> 
                    </div> 
                )              
            } )}
        </div>
        </div>
        </div>
    )
}

export default Posts