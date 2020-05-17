import axios from "axios";
const baseUrl = "/api/notes";

const getNotes = () => {
  const request = axios.get(baseUrl);
  const nonExistingNote = {
    id: 1000,
    content: "Non existing note",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  };
  return request.then((response) => {
    return response.data.concat(nonExistingNote);
  });
};

const createNote = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => {
    return response.data;
  });
};

const updateNote = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => {
    return response.data;
  });
};
export default {
  getNotes: getNotes,
  createNote: createNote,
  updateNote: updateNote,
};
