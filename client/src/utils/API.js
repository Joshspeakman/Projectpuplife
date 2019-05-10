import axios from "axios";

export default {
  signup: function(data) {
    return axios.post("/api/signup", data);
  },

  getDogs: function() {
    return axios.get("/api/dogs");
  },

  saveDog: function (dog) {
    return axios.put("/api/dogs", dog);
  },

  deleteDog: function (id) {
    return axios.delete("/api/dogs/" + id);
  },

  review: function(data) {
    return axios.post("/api/review", data);
  },

  getReviews: function (dogId) {
    return axios.get("/api/review/" + dogId);
  },

  getProfile: function(id) {
    return axios.get("/api/profile/" + id);
  },

  login: function(data) {
    return axios.post("/api/login", data);
  },
};
