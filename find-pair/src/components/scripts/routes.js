import axios from "axios";

const addUserData = async dataObject => {
  try {
    const res = await axios.post("/api/data/addData", dataObject);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getUserData = async arg => {
  try {
    const res = await axios.get(`/api/data/getData${arg}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getDataCount = async data => {
  try {
    const res = await axios.get(`/api/data/getDataCount${data}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getSoretdUserData = async query => {
  try {
    const res = await axios.get(`/api/data/getData${query}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateUserData = async (dataObject, id) => {
  try {
    const res = await axios.patch(`/api/data/updateuser/${id}`, dataObject);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getSpecificUserData = async id => {
  try {
    const res = await axios.get(`/api/data/getData/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateStats = async dataObject => {
  try {
    const res = await axios.patch(`/api/data/updatestat`, dataObject);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getStatDatas = async () => {
  try {
    const res = await axios.get("/api/data/getstat");
    return res;
  } catch (err) {
    console.log(err);
  }
};
export {
  addUserData,
  getUserData,
  getSoretdUserData,
  getDataCount,
  updateUserData,
  getSpecificUserData,
  updateStats,
  getStatDatas
};
