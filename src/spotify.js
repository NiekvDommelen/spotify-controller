import axios from "axios";
import {Buffer} from 'buffer';




const config = require( "./config.json");

class spotify {
    constructor(){
        this.id = '';
        this.name = '';
        this.artist = '';
        this.progress = 0;
        this.duration = 0;
        this.token = '';
    }

    async update(){
      try {
        let response = await axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/player/currently-playing',
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
          let responseData = await response.data;
       
          this.id = responseData.item.id;
          this.name = responseData.item.name;
          this.artist = responseData.item.artists[0].name;
          this.progress = Math.floor(responseData.progress_ms / 1000);
          this.duration = Math.floor(responseData.item.duration_ms / 1000);
          this.playing = responseData.is_playing;
       
      } catch (error) {
          this.token = await this.refreshToken();
      }       
          
    }

    seek(position_s){
      axios({
        method: 'put',
        url: `https://api.spotify.com/v1/me/player/seek?position_ms=${(position_s * 1000)}`,
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
    }

    next(){
      axios({
        method: 'post',
        url: "https://api.spotify.com/v1/me/player/next",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
    }

    previous(){
      axios({
        method: 'post',
        url: "https://api.spotify.com/v1/me/player/previous",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      
    }

    play_pause(playing){
      if(playing){
        axios({
          method: 'put',
          url: 'https://api.spotify.com/v1/me/player/pause',
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
      }else{
        axios({
          method: 'put',
          url: 'https://api.spotify.com/v1/me/player/play',
          headers: {
            Authorization: "Bearer " + this.token,
          },
        })
      }
    }
    
      
    async refreshToken(){

      var refresh_token = config.refresh_token;
      var client_id = config.client_id;
      var client_secret = config.client_secret
      const url = "https://accounts.spotify.com/api/token";
    
      let response = await axios({
        method: 'POST',
        url: url,
        headers: {
         'content-type': 'application/x-www-form-urlencoded',
         'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        data: {
         grant_type: 'refresh_token',
         refresh_token: refresh_token
        },
      })
       
       let access_token = response.data.access_token;
       return access_token
     }

}   

export default spotify;