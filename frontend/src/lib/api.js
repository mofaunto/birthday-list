import axios from 'axios'

const HOST = import.meta.env.VITE_PRODUCTION;

export async function fetchPeople() {
    try {
        const response = await axios.get(`${HOST}`);

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error("Something went wrong", error)        
    }
}

export async function postPeople(newPerson) {
  try {
    const response = await axios.post(`${HOST}`, newPerson);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}


export async function updatePeople(id, updatedData) {
  try {
    const response = await axios.patch(`${HOST}/${id}`, updatedData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}

export async function deletePeople(id) {
  try {
    const response = await axios.delete(`${HOST}/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}