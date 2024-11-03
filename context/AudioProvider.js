import React, { Component, createContext } from 'react';
import {DataProvider} from 'recyclerlistview';
import tracks from '../tracks/tracks';
import {playNext} from '../misc/audioController';
import {setAdMobInterstitial} from '../misc/helper';

export const AudioContext = createContext();

class AudioProvider extends Component {
    constructor(props){
        super(props);

        this.state = {
            audioFiles:[],
            playList:[],
            addToPlayList:null,
            dataProvider:new DataProvider((r1,r2)=>r1!==r2),
            playbackObj:null,
            soundObj:null,
            currentAudio:{},
            isPlaying:false,
            currentAudioIndex:0,
            playbackPosition:null,
            playbackDuration:null
        }

        this.totalAudioCount = 0;
    }

    onGoingAudio = async (nextAudioIndex) => {
      //if there is no next audio or current audio is the last
        if(nextAudioIndex >= this.totalAudioCount){
          await this.state.playbackObj.unloadAsync();
          return this.updateState(this, {
            soundObj:null, 
            currentAudio:this.state.audioFiles[0], 
            isPlaying:false, 
            currentAudioIndex:0, 
            playbackPosition:null,
            playbackDuration:null
          });
        }
    
        //otherwise we want to select another audio
        const audio = this.state.audioFiles[nextAudioIndex];
        const status = await playNext(this.state.playbackObj, audio.uri);
    
        this.updateState(this, {
          soundObj:status, 
          currentAudio:audio, 
          isPlaying:true, 
          currentAudioIndex:nextAudioIndex
        });
    }

    onPlaybackStatusUpdate = async (playbackStatus) => {
      if(playbackStatus.isLoaded && playbackStatus.isPlaying){
        this.updateState(this,{
          playbackPosition:playbackStatus.positionMillis,
          playbackDuration:playbackStatus.durationMillis,
        });
      }
      
      if(playbackStatus.didJustFinish){
        const nextAudioIndex = this.state.currentAudioIndex + 1;

        /* if((nextAudioIndex+1)%5===0 && !(nextAudioIndex >= this.totalAudioCount)) {
          setAdMobInterstitial().then(res => {this.onGoingAudio(nextAudioIndex)});
        }else{
          this.onGoingAudio(nextAudioIndex);
        } */
        
        // refactor as 'onGoingAudio' method!!!!
        //if there is no next audio or current audio is the last
        if(nextAudioIndex >= this.totalAudioCount){
          await this.state.playbackObj.unloadAsync();
          return this.updateState(this, {
            soundObj:null, 
            currentAudio:this.state.audioFiles[0], 
            isPlaying:false, 
            currentAudioIndex:0, 
            playbackPosition:null,
            playbackDuration:null
          });
        }
    
        //otherwise we want to select another audio
        const audio = this.state.audioFiles[nextAudioIndex];
        const status = await playNext(this.state.playbackObj, audio.uri);
    
        this.updateState(this, {
          soundObj:status, 
          currentAudio:audio, 
          isPlaying:true, 
          currentAudioIndex:nextAudioIndex
        });
      }
    }

    componentDidMount(){
        const {dataProvider,audioFiles} = this.state;

        this.setState({...this.state, dataProvider:dataProvider.cloneWithRows([...audioFiles, ...tracks]), audioFiles:[...audioFiles, ...tracks]});

        this.totalAudioCount = tracks.length;
    }

    updateState = (prevState, newState={}) => {
        this.setState({...prevState, ...newState})
    }

    render() {
        const {
            audioFiles,
            playList,
            addToPlayList,
            dataProvider, 
            playbackObj, 
            soundObj, 
            currentAudio, 
            isPlaying, 
            currentAudioIndex, 
            playbackPosition, 
            playbackDuration
        } = this.state;

        return (
            <AudioContext.Provider value={{
                audioFiles, 
                playList,
                addToPlayList,
                dataProvider, 
                playbackObj, 
                soundObj, 
                currentAudio,
                isPlaying,
                currentAudioIndex,
                totalAudioCount:this.totalAudioCount,
                playbackPosition,
                playbackDuration,
                updateState:this.updateState,
                onPlaybackStatusUpdate:this.onPlaybackStatusUpdate,
            }}>
                {this.props.children}
            </AudioContext.Provider>
        );
    }
}

export default AudioProvider;