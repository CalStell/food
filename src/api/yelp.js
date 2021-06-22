import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer hdN-7iA_TDDNly3DStcVpCoQgLyYx5mjuAe_qY8Xople3JMsJ6DL_zHs__8-zlkZ80USHinqXYa9IMiLkvkz8_z1hNwrDoFqAk5pl4yYk3WtaYv2h_AUCNWAG26uYHYx",
  },
});
