import React from 'react';
import {View, StyleSheet, Modal, StatusBar, Text, TouchableWithoutFeedback} from 'react-native';
import color from '../misc/color';

const OptionModal = ({visible, currentItem, onClose}:{visible:any, currentItem:any, onClose:any}) => {
    const {title} = currentItem;
    return (
        <>
        {/* {StatusBar.setHidden(visible)} */}
        <Modal animationType='fade' transparent visible={visible}>
            <View style={styles.modal}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBg} />
            </TouchableWithoutFeedback>
        </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modal:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        backgroundColor:color.APP_BG,
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        zIndex:1000,
        paddingBottom:25,
    },
    title:{
        fontSize:20,
        fontWeight:'bold',
        padding:20,
        paddingBottom:0,
        color:color.FONT_MEDIUM
    },
    optionContainer:{
        padding:20
    },
    option:{
        fontSize:16,
        fontWeight:'bold',
        color:color.FONT,
        paddingVertical:10,
        letterSpacing:1,
    },
    modalBg:{
        position:'absolute',
        top:0,
        right:0,
        left:0,
        bottom:0,
        backgroundColor:color.MODAL_BG
    }
});

export default OptionModal;