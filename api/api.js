import axios from "axios";
const apiDefUrl = 'http://localhost:3000/api/data'; 

const fetchData = (userName) => {
  return axios.post(apiDefUrl,{userName:userName}) 
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw error; 
    });
};

export default fetchData;
