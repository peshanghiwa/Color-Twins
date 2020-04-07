import axios from "axios";

const addUserData = async dataObject => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:3000/api/data/addData",
      dataObject
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getUserData = async arg => {
  try {
    const res = await axios.get(`http://127.0.0.1:3000/api/data/getData${arg}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getDataCount = async data => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/data/getDataCount${data}`
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getSoretdUserData = async query => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/data/getData${query}`
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateUserData = async (dataObject, id) => {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:3000/api/data/updateuser/${id}`,
      dataObject
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getSpecificUserData = async id => {
  try {
    const res = await axios.get(`http://127.0.0.1:3000/api/data/getData/${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const updateStats = async dataObject => {
  try {
    const res = await axios.patch(
      `http://127.0.0.1:3000/api/data/updatestat`,
      dataObject
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getStatDatas = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:3000/api/data/getstat");
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
