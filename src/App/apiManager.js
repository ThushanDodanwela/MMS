export const post = (path, body, onSuccess = () => {}, onFailed = () => {}) => {
  fetch(process.env.REACT_APP_BASE_URL + path, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "success") {
        onSuccess(data);
      } else {
        onFailed(data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      onFailed(error);
    });
};
