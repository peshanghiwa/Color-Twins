import axios from "axios";

export const getData = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/data/getData"
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addData = async data => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/data/addData",
      data
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
