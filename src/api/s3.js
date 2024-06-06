import stageConfig from "../stageConfig.json";

const apiUrl = `https://s0ppok2qoj.execute-api.eu-west-2.amazonaws.com/${stageConfig.stage}`;

export async function saveConfig(auth, payload) {

  const token = await auth.getToken(); 
  const response = await fetch(`${apiUrl}/config`, {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: payload,
    }),
  });
  return response.json().then((response) => {
    if (response.body?.errorMessage) {
      throw Error(response.body.errorMessage);
    }
    return response;
  });
}

export async function setDefaultConfig(auth, payload) {
  const token = await auth.getToken(); 
  const response = await fetch(`${apiUrl}/config`, {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: payload,
    }),
  });
  return response.json().then((response) => {
    if (response.body?.errorMessage) {
      throw Error(response.body.errorMessage);
    }
    return response;
  });
}

export const getConfigs = async (auth, id) => {
  const token = await auth.getToken();
  const model = await fetch(`${apiUrl}/config?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const body = data.body;
      return body;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return model;
};

export const getConfigList = async (auth,id) => {
  const token = await auth.getToken();
  const model = await fetch(`${apiUrl}/config/list?id=${id}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const body = data.body;
      return body;
    })
    .catch((err) => {
      console.log(err.message);
    });
  return model;
};
