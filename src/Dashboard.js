import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import "./App.css"
import Player from "./Player"
import { makeStyles } from '@material-ui/core/styles';
import { Container, Form } from "react-bootstrap"
import TrackSearchResult from "./TrackSearchResult"
import SpotifyWebApi from "spotify-web-api-node";
import {Link} from 'react-router-dom';
import SpotifyPlayer from 'react-spotify-player';

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '10vh',
        backgroundColor: 'black',

        '& img':{
            width: '25%'
        },

        '& a':{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#1db954',
            fontWeight: 200,
            color: 'white',
            textDecoration: 'none',
        },

        '& a:hover':{
        }
    },
    words:{
        backgroundColor: 'black', 
        color:'white' 
    },
    inner:{
        marginLeft:"500px",
    },
    side:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        flexGrow: 1,
        width: '100%'
      },
      rowLayout: {
        display: 'flex',
        backgroundColor: 'black', 
        color:'white'
      },
      mainpic: {
        display: 'grid',
        justifyContent: 'center',
        alignItems: 'right', // To be vertically aligned
        backgroundColor: 'black', 
        color:'white'
      },
      search: {
        border: "10px white",
        borderradius: "5px",
        height: "10px",
        padding: "20px",
        color:"white",
        backgroundColor: "black"
      },
      logoc:{
        display: 'grid',
        placeItems: 'center',
      },
      emailc:{
        display: 'flex',
        color:"#1DB954",

      }
});

// Setting the spotifyApi, so that we can use it's functions
const spotifyApi = new SpotifyWebApi({
  clientId: "7b215911d14245089d73d78055353cb2",
});


const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [userinfo, setUserInfo] = useState([])
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [playingTrack, setPlayingTrack] = useState()
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch("")
    setLyrics("")
  }

    // size may also be a plain string using the presets 'large' or 'compact'
  const size = {
    width: '100%',
    height: 100,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'


  useEffect(() => {
    if (!accessToken) return;

    // Setting Up the spotifyApi with AccessToken so that we can use its functions anywhere in the component without setting AccessToken value again & again. 
    spotifyApi.setAccessToken(accessToken);

    // Get user details with help of getMe() function
    spotifyApi.getMe().then(data => {
        console.log(data.body)
        setUserInfo(data.body)
    })

    spotifyApi.searchTracks('Love')
  .then(function(data) {
    console.log('Search by "Love"', data.body);
  }, function(err) {
    console.error(err);
  });

  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false
    spotifyApi.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(
        res.body.tracks.items.map(track => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image
              return smallest
            },
            track.album.images[0]
          )

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          }
        })
      )
    })

    return () => (cancel = true)
  }, [search, accessToken])


  const classes = useStyles()
  return (
            <div className={classes.words}>
              <div className={classes.logoc}>
              <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify-Logo"
                            style={{height: "100px",width:"25%"}} />
              </div>
            <h1 style={{textAlign:"center"}}>Hi {userinfo.display_name}!, Welcome to Tune Zone Spotify web service Dashboard</h1>
                <div className="container">
                <div className={classes.login}>
                <a>Email: {userinfo.email} Country:{userinfo.country}</a>
                  </div>                    
                </div>
                <div className={classes.words}>
                    <div className='container'>
                <h3>Search and Select a Song for Post</h3>
            <Container style={{ height: "100vh" }}>
      <Form.Control className={classes.search}
        type="search"
        placeholder="Search Songs/Artists"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
      </div>
      
      {playingTrack && <div className={classes.mainpic}>
      <SpotifyPlayer
          uri={playingTrack.uri}
          size={size}
          view={view}
          theme={theme}
        />
      <div className="ml-3">
        <div>Track       : {playingTrack.title}</div>
        <div>Artist      : {playingTrack.artist}</div>
        <div>Spotify Track ID : {playingTrack.uri.split(":")[2]}</div>
        <br></br>
        <div className={classes.login}>
        <a href={playingTrack.uri}>Click here to open in App</a>
        <br></br>
        <Link to={`/posts/${playingTrack.uri.split(":")[2]}/${accessToken}`} className="btn btn-raised btn-dark bt-sn">Go To Posts</Link>
      </div>
      </div>
      </div>}
    </Container>
    </div>
            </div>
            </div>
		        
  );
};

export default Dashboard;