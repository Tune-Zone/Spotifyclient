import "./App.css";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {Link} from 'react-router-dom';
import { Container, Form } from "react-bootstrap"

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        backgroundColor: 'black',
        color:'white',

        '& img':{
            width: '25%'
        },

        '& a':{
            padding: '20px',
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
      color: 'white'
    }
});
const Remix = () => {
    const [posttitle, setPosttitle] = useState();
    const [postbody, setPostbody] = useState();
    const [trackname, setTrackname] = useState();
    const [tracklink, setTracklink] = useState();
    const [trackby, setTrackby] = useState();
    const [desc, setTrackdesc] = useState();

    const classes = useStyles()
    let { track, post, accessToken } = useParams();
    useEffect(() => {
        axios
          .get(`https://tunezoneinfo.herokuapp.com/api/post/${post}`)
          .then((response) => {
            setPosttitle(response.data.title);
            setPostbody(response.data.body);
          })
          .catch((err) => {
            console.log(err)
          });
      });

      useEffect(() => {
          axios.get(`https://api.spotify.com/v1/tracks/${track}` , { headers: {"Authorization" : `Bearer ${accessToken}`} })
          .then((res) => {
              console.log(res.data.album)
            setTrackname(res.data.album.name);
            setTrackby(res.data.album.artists[0].name);
            setTracklink(res.data.album.uri)
          })
          .catch((error) => {
            console.log(error)
          });
      });

      const submitValue = () => {
        const postdetails = {
            "title": posttitle,
            "body": postbody,
            "track": trackname,
            "artist": trackby,
            "description": desc
        }
        console.log(postdetails);
        axios
          .post("https://spotifytzback.herokuapp.com/createremix",postdetails)
          .then((response) => {
            console.log(response)
            window.history.pushState({}, null, "/remixposts");
          })
          .catch((err) => {
            console.log(err)
          });

    }
      

    return (
        <div className={classes.login}>
        <h1>Create a post with selected song and Post</h1>
        <h3>Post Title  :{posttitle}</h3>
        <h3>Post        :{postbody}</h3>
        <h3>Track Name  :{trackname}</h3>
        <h3>Track Artist:{trackby}</h3>
        <h3>Track Link  :<a href={tracklink}>{tracklink}</a></h3>
        <div className="container">
        <Form.Control
        type="text"
        placeholder="Description"
        onChange={e => setTrackdesc(e.target.value)}
      />
        </div>
      <br></br>
    <Link onClick={submitValue} to={"/remixposts"} className="btn btn-raised btn-dark bt-sn">Submit</Link>
    </div>
    )
}

export default Remix
