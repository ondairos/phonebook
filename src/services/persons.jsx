import axios from "axios";

// const baseUrl = "http://localhost:3001/api/persons";
// in vite js you need to modify the vite.config.js file not the package.json file like react app. For proxy server
const baseUrl = "/api/persons";


//get
const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

//post --create
const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((res) => res.data);
};

//put -- update
const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((res) => res.data);
};

// delete
const deletePerson = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

export default { getAll, create, update, deletePerson };
