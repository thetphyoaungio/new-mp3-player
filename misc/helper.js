//import { AdMobInterstitial } from "expo-ads-admob";

export const convertTime = (time) => {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

/* export const setAdMobInterstitial = async () => {
  AdMobInterstitial.removeAllListeners();

  AdMobInterstitial.setAdUnitID("ca-app-pub-5889748970088125/8654853900");

  await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: false })
    .then(() => {
      if (AdMobInterstitial.isLoaded() || AdMobInterstitial.isLoading()) {
        AdMobInterstitial.showAdAsync();
      }
    })
    .catch((err) => console.log("got err=> ", err));
  // await AdMobInterstitial.showAdAsync();
}; */