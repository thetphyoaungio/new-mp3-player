import React, { Component } from 'react';
import {StyleSheet, Dimensions, ImageBackground} from 'react-native';
import {RecyclerListView, LayoutProvider} from 'recyclerlistview';
import { AudioContext } from '../context/AudioProvider';
import AudioListItem from '../components/AudioListItem';
import Screen from '../components/Screen';
import OptionModal  from '../components/OptionModal';
import {Audio} from 'expo-av';
import {selectAudio} from '../misc/audioController';
//import {AdMobBanner} from 'expo-ads-admob';

class AudioList extends Component { 
  static contextType = AudioContext;

  constructor(props){
    super(props);

    this.state = {
      optionModalVisible:false,
    }

    this.currentItem = {}
  }

  componentDidMount(){
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }

  layoutProvider = new LayoutProvider((i)=>'audio', (type,dim)=>{
    switch(type){
      case 'audio':{
        dim.width = Dimensions.get('window').width;
        dim.height = 85;
        break;
      }
      default:{
          dim.width = 0;
          dim.height = 0;
      }
    }
  });

  rowRenderer = (type,item, index, extendedState) => {
    return (
      <AudioListItem 
      title={item.title} 
      duration={item.duration } 
      onOptionPress={()=>{
        this.currentItem = item;
        this.setState({...this.state, optionModalVisible:true})
      }}
      onAudioPress={()=>this.handleAudioPress(item)} 
      isPlaying={extendedState.isPlaying}
      activeListItem={this.context.currentAudioIndex===index}
      listIndex={index}
      audioCount={this.context.totalAudioCount}
      primaryTitle={item.primaryTitle} />
    )
  };

  handleAudioPress = async (audio) => {
    await selectAudio(audio, this.context);
  }

  render() {
    return (
      <AudioContext.Consumer>
        {({dataProvider, isPlaying})=>{
          if(!dataProvider._data.length) return null;

          return(
            <Screen>
              <ImageBackground source={require('../assets/my-imgs/audiolist_cover/Buddha_2.jpg')} style={styles.backageImg} />
                <RecyclerListView 
                dataProvider={dataProvider} 
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
                extendedState={{isPlaying}} />

                {/* <AdMobBanner  style={{alignItems: 'center',justifyContent: 'center'}}
                bannerSize='banner' 
                adUnitID='ca-app-pub-5889748970088125/9548708144' 
                servePersonalizedAds={false}
                /> */}

                <OptionModal 
                currentItem={this.currentItem}
                onClose={() => {
                  this.setState({...this.state, optionModalVisible:false})
                }} 
              visible={this.state.optionModalVisible} />
            </Screen>
          ) 
        }}
      </AudioContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0
    },
    backageImg:{
      width:'100%',
      //height:'100%',
      resizeMode:'cover',
      position:'absolute',
      opacity:0.3,
      top:0,
      bottom: 0
    }
})

export default AudioList;