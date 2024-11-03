import React, {useContext} from 'react';
import {View, StyleSheet,Text, Dimensions, ImageBackground} from 'react-native';
import Screen from '../components/Screen';
import color from '../misc/color';
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import {AudioContext} from '../context/AudioProvider';
import { pause, selectAudio, changeAudio, moveAudio } from '../misc/audioController';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { convertTime } from '../misc/helper';
//import {AdMobBanner} from 'expo-ads-admob';

const {width} = Dimensions.get('window');

const Player = () => {
    const context = useContext(AudioContext);

    const {playbackPosition, playbackDuration} = context;

    const calculateSeekBar = () => {
        if(playbackPosition && playbackDuration){
            return playbackPosition/playbackDuration;
        }

        return 0;
    }

    handlePlayPause = async () => {
        await selectAudio(context.currentAudio, context);
    }

    handleNext = async () => { 
        await changeAudio(context, 'next');
    }

    handlePrevious = async () => { 
        await changeAudio(context, 'previous');
    }

    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1} / ${context.totalAudioCount}`}</Text>
                <View style={styles.midBannerContainer}>
                    {context.currentAudio.artwork?<ImageBackground source={context.currentAudio.artwork} style={styles.backageImg} /> : 
                    <MaterialCommunityIcons name="music-circle" size={300} color={color.FONT_MEDIUM} />}
                </View>

                <View>
                    <Text numberOfLines={1} style={[styles.audioTitle,{paddingBottom:0}]}>{context.currentAudio.primaryTitle}</Text>
                    <Text numberOfLines={1} style={[styles.audioTitle,{fontSize:14, color:'grey', paddingTop:0}]}>{context.currentAudio.title}</Text>

                    <View style={{flexDirection:'row', justifyContent: 'flex-end', paddingHorizontal:15}}>
                        <Text style={{color:color.FONT_MEDIUM}}>{convertTime(context.currentAudio.duration)}</Text>
                    </View>

                    <Slider
                    style={{width: width, height: 40}}
                    minimumValue={0}
                    maximumValue={1} 
                    value={calculateSeekBar()}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG} 
                    disabled={!context.currentAudio.artwork} 
                    onSlidingStart={
                        async ()=>{
                            if(!context.isPlaying) return;

                            try {
                                await pause(context.playbackObj);
                            } catch (error) {
                                console.log('Error occurs in onSlidingStart callback', error.message);
                            }
                        }
                    } 
                    onSlidingComplete={async (value) => {
                        await moveAudio(context, value);
                    }}
                    />
                    <View style={styles.audioControllers}>
                        <PlayerButton 
                        onPress={handlePrevious}
                        iconType='PREV' 
                        disabled={!context.currentAudio.artwork} />

                        <PlayerButton 
                        onPress={handlePlayPause}
                        style={{marginHorizontal:25}}
                        iconType={context.isPlaying?'PLAY':'PAUSE'} 
                        disabled={!context.currentAudio.artwork} />

                        <PlayerButton 
                        onPress={handleNext} 
                        iconType='NEXT' 
                        disabled={!context.currentAudio.artwork} />
                    </View>

                    {/* <AdMobBanner  style={{alignItems: 'center',justifyContent: 'center'}}
                    bannerSize='banner' 
                    adUnitID='ca-app-pub-5889748970088125/9548708144' 
                    servePersonalizedAds={false}
                    /> */}
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    audioCount:{
        textAlign:'right',
        padding:15,
        color: color.FONT_LIGHT,
        fontSize:14,
    },
    midBannerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    audioTitle:{
        fontSize:16,
        color:color.FONT,
        padding:15,
    },
    audioControllers:{
        width,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:20,
    },
    backageImg:{
        width:'100%',
        //height:'100%',
        resizeMode:'cover',
        position:'absolute',
        top: 0,
        bottom: 0
    }
})

export default Player;