import axios from 'axios'

export async function fetchPeople() {
    try {
        const response = await axios.get('http://localhost:5000/api/friends');

        if (response.status === 200) {
            return response.data
        }
    } catch (error) {
        throw new Error("Something went wrong", error)        
    }
}

export async function postPeople(newPerson) {
  try {
    const response = await axios.post('http://localhost:5000/api/friends', newPerson);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}


export async function updatePeople(id, updatedData) {
  try {
    const response = await axios.patch(`http://localhost:5000/api/friends/${id}`, updatedData);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}

export async function deletePeople(id) {
  try {
    const response = await axios.delete(`http://localhost:5000/api/friends/${id}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
}