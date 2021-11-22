import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
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
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#1db954',
            fontWeight: 100,
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
        backgroundColor: 'lightblue',    
    },
    backc:{
        backgroundColor: 'black',
        color: 'black'
    },
    titlec:{
        color:'blue'
    },
    bodyc:{
        color:"lightblue"
    },
    butc:{
        backgroundColor: '#1db954',
        fontWeight: 10,
        color: 'white',
        textDecoration: 'none'
    }
});
const Tuneposts = () => {
    const [posts, setPosts] = useState([]);
    const classes = useStyles()

    useEffect(() => {
        axios
          .get("http://localhost:8000/getremix")
          .then((response) => {
            setPosts(response.data);
            window.history.pushState({}, null, "/remixposts");
          })
          .catch((err) => {
            console.log(err)
          });
      });
    const homemove = () => {
        window.history.pushState({}, null, "/");
    }
    return (
        <div className={classes.backc}>
                <div className={classes.butc}>
            <a style={{color:"white"}}href="/">Go to home</a>
            </div>
            <div className="row">
            {posts.map((post, i) => {
                return (
                    <div className="card col-md-4" key = {i}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.body.substring(0,50)}...</p>
                            <p className="card-text">{post.track}</p>
                            <p className="card-text">{post.artist}</p>
                            <p className="card-text">{post.description.substring(0,50)}...</p>
                            <br />
                            <p className="font-italic mark">
                                posted on  {new Date(post.created).toDateString()}
                            </p>
                        </div>
                    </div>  
                )              
            } )}
        </div>
        </div>
    )
}

export default Tuneposts