import axios from "axios";

export let AuthService = async (url, payload) => {
  try {
    let { data } = await AxiosInstance.post(url, payload);
    return data;
  } catch (error) {
    return error;
  }
};

export let ProfileService = async (url, token) => {
  try {
    let { data } = await AxiosInstance.get(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export let CourseService = async (url, payload, token) => {
  try {
    let { data } = await AxiosInstance.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export let fetchBootcampsService = async url => {
  try {
    let { data } = await AxiosInstance.get(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let oneBootcampService = async url => {
  try {
    let { data } = await AxiosInstance.get(url);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let updateBootcampService = async (url, payload, token) => {
  try {
    let { data } = await AxiosInstance.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let deleteBootcampService = async (url, token) => {
  try {
    await AxiosInstance.delete(url, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error);
  }
};

//Profile Service

export let createProfileService = async (url, payload, token) => {
  try {
    let { data } = AxiosInstance.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let getProfileService = async (url, token) => {
  try {
    let { data } = await AxiosInstance.get(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let uploadPhotoService = async (url, payload, token) => {
  try {
    let { data } = AxiosInstance.patch(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export let updateService = async (url, payload, token) => {
  try {
    let { data } = AxiosInstance.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

let AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
});

export default AxiosInstance;
