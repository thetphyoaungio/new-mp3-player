import React from 'react';
import {AntDesign} from '@expo/vector-icons';
import color from '../misc/color';

const PlayerButton = (props:any) => {
    const {iconType, size=40, iconColor=color.FONT, onPress, disabled} = props;

    const getIconName = (type:string) => {
        switch(type){
            case 'PLAY':{
                return 'pausecircle';
            }
            case 'PAUSE':{
                return 'playcircleo';
            }
            case 'NEXT':{
                return 'forward';
            }
            case 'PREV':{
                return 'banckward';
            }
        }
    }
    
    return(
        <AntDesign 
        {...props}
        onPress={onPress}
        name={getIconName(iconType)}
        size={size}
        color={disabled?color.FONT_MEDIUM:iconColor} 
        disabled={disabled} />
    )
}

export default PlayerButton;