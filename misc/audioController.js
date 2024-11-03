import {Audio} from 'expo-av';

//play
export const play = async (playbackObj, uri) => {
    try{
      return await playbackObj.loadAsync(uri, {shouldPlay: true, progressUpdateIntervalMillis: 1000});
    }catch(error){
        console.log('Error in play controller: ', error.message);
    }
}

//pause
export const pause = async (playbackObj) => {
    try{
        return await playbackObj.pauseAsync();
    }catch(error){
        console.log('Error in pause controller: ', error.message);
    }
}

//resume
export const resume = async (playbackObj) => {
    try{
        return await playbackObj.playAsync();
    }catch(error){
        console.log('Error in play(resume) controller: ', error.message);
    }
}

//next
export const playNext = async (playbackObj, uri) => {
    try{
        await playbackObj.stopAsync();
        await playbackObj.unloadAsync();
        return await play(playbackObj, uri);
    }catch(error){
        console.log('Error in play-next controller: ', error.message);
    }
}

export const selectAudio = async (audio, context) => {
    const {
      playbackObj, 
      soundObj, 
      currentAudio, 
      updateState, 
      audioFiles,
      onPlaybackStatusUpdate
    } = context;

    try {
      //play first time
      if(!soundObj){
        const playbackObj = new Audio.Sound();
        
        const status = await play(playbackObj, audio.uri);
        const index = audioFiles.indexOf(audio);
  
        updateState(context, {
          playbackObj:playbackObj, 
          soundObj:status, 
          currentAudio:audio, 
          isPlaying:true, 
          currentAudioIndex:index
        });
  
        return playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      }
  
      //pause the audio
      if( soundObj.isLoaded &&  soundObj.isPlaying && currentAudio.id===audio.id){
        const status = await pause(playbackObj);
        
        return updateState(context, {
          soundObj:status, 
          isPlaying:false,
          playbackPosition: status.positionMillis
        });
      }
  
      //resume the audio
      if(soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id===audio.id){
        const status = await resume(playbackObj);
        
        return updateState(context, {
          soundObj:status, 
          isPlaying:true
        });
      }
  
      //play next
      if(soundObj.isLoaded && currentAudio.id!==audio.id){
        const status = await playNext(playbackObj,audio.uri);
        
        const index = audioFiles.indexOf(audio);
  
        return updateState(context, {
          soundObj:status, 
          currentAudio:audio, 
          isPlaying:true, 
          currentAudioIndex:index
        });
      }
    } catch (error) {
      console.log('Error in select audio controller: ', error.message);
    }
}

export const changeAudio = async (context, type) => {
  const {playbackObj, currentAudioIndex, totalAudioCount, audioFiles, updateState} = context;

  try {
    const {isLoaded} = await playbackObj.getStatusAsync();
    let index, status, audio;

    if(type==='next'){
      const isLastAudio = currentAudioIndex + 1 === totalAudioCount;
      audio = audioFiles[currentAudioIndex + 1];

      if(!isLoaded && !isLastAudio){
        index = currentAudioIndex + 1;
        status = await play(playbackObj, audio.uri);
      }

      if(isLoaded && !isLastAudio){
        index = currentAudioIndex + 1;
        status = await playNext(playbackObj, audio.uri);
      }

      if(isLastAudio){
        index = 0;
        audio = audioFiles[0];

        if(isLoaded){
          status = await playNext(playbackObj, audio.uri);
        }else{
          status = await play(playbackObj, audio.uri);
        }
      }
    }else if(type==='previous'){
      const isFirstAudio = currentAudioIndex === 0;
      audio = audioFiles[currentAudioIndex - 1];

      if(!isLoaded && !isFirstAudio){
          index = currentAudioIndex - 1;
          status = await play(playbackObj, audio.uri);
      }

      if(isLoaded && !isFirstAudio){
        index = currentAudioIndex - 1;
        status = await playNext(playbackObj, audio.uri);
      }

      if(isFirstAudio){
        index = totalAudioCount-1;
        audio = audioFiles[index];

        if(isLoaded){
          status = await playNext(playbackObj, audio.uri);
        }else{
          status = await play(playbackObj, audio.uri);
        }
      }
    }
    
    updateState(context,{
      currentAudio:audio,
      playbackObj:playbackObj,
      soundObj:status,
      isPlaying:true,
      currentAudioIndex:index,
      playbackPosition:null,
      playbackDuration:null,
    }); 
  } catch (error) {
    console.log('Error in change audio controller: ', error.message);
  }
}

export const moveAudio = async (context, value) => {
  const {soundObj, isPlaying, playbackObj, updateState} = context;

  if(!soundObj || !isPlaying) return;

  try {
    const status = await playbackObj.setPositionAsync(
      Math.floor(soundObj.durationMillis * value)
    );

    updateState(context, {
      soundObj: status, 
      playbackPosition: status.positionMillis
    });
    
    await resume(playbackObj);
  } catch (error) {
    console.log('Error occurs in onSlidingComplete callback', error.message);
  }
}