import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Screen from "../components/Screen";
import color from "../misc/color";
//import { AdMobBanner } from "expo-ads-admob";

const About = () => {
  return (
    <Screen>
      <ImageBackground
        source={require("../assets/my-imgs/about_cover/Buddha.jpg")}
        style={styles.backageImg}
      />
      <View style={styles.container}>
        <Text style={styles.text}>
          May you be able to respectfully and continuously listen to the sermons and protective verses (parittas) day and night.
        </Text>
        <Text style={[styles.text,{fontSize:15, color: '#111111'}]}>
          ပဌာန်းဒေသနာ၊ ပရိတ်တရားတော်များကို နေ့ညမပြတ်၊ ကြည်ညိုစွာ နာယူနိုင်ကြပါစေ။
        </Text>


        <Text style={styles.text}>🙏🙏🙏</Text>

        <Text style={styles.text}>
          May you gain special merit...
        </Text>
        <Text style={[styles.text,{fontSize:15, color: '#111111'}]}>
          ကုသိုလ်အထူး ရရှိနိုင်ကြပါစေ...
        </Text>

        <View
          style={{position:'absolute', bottom:0}}
        >
          <Text style={[styles.text, { color: "blue", paddingRight: 2 }]}>
            This Dhamma offering of merit is provided by
            <Text style={{ color: "brown", fontWeight:'bold' }}> Ko Pauk</Text>.
          </Text>
          <Text style={[styles.text, { color: "blue", paddingRight: 2, fontSize:15 }]}>
            <Text style={{ color: "brown", fontWeight:'bold' }}>ကိုပေါက်</Text> မှ ဓမ္မဒါနကုသိုလ်ပြုအပ်ပါသည်။
          </Text>
        </View>
      </View>

      {/* <AdMobBanner
        style={{ alignItems: "center", justifyContent: "center" }}
        bannerSize="banner"
        adUnitID="ca-app-pub-5889748970088125/9548708144"
        servePersonalizedAds={false}
      /> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backageImg: {
    width: "100%",
    //height: "700px",
    resizeMode: "cover",
    position: "absolute",
    opacity: 0.3,
    top: 0,
    bottom: 0
  },
  text: {
    fontSize: 18,
    color: color.FONT,
    lineHeight: 30,
  },
  smallText: {
    fontSize: 16,
    color: "brown",
  }
});

export default About;