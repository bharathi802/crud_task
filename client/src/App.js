import './App.css';
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:7000"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
  })
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    number: "",
  })
  const [datalist, setDatalist] = useState([])

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData)
    console.log(formData);
    console.log(data)
    if (data.data.success) {
      setAddSection(false)
      alert(data.data.message)
      getData()
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Show a loading indicator if needed
  //     // Optionally, you can set a state like setIsLoading(true);

  //     const response = await axios.post("/create", formData);

  //     if (response.data.success) {
  //       // Optionally, reset the form after successful submission
  //       setFormData({
  //         name: "",
  //         email: "",
  //         number: "",
  //       });

  //       // Close the add section
  //       setAddSection(false);

  //       // Fetch updated data
  //       getData();

  //       // Display a success message
  //       alert(response.data.message);
  //     } else {
  //       // Handle cases where the API request was successful but the operation failed
  //       console.error("Operation failed:", response.data.message);
  //       alert("Operation failed. Please try again.");
  //     }
  //   } catch (error) {
  //     // Handle network errors or other issues
  //     console.error("Error submitting form:", error);
  //     alert("An error occurred. Please try again.");
  //   } 
  // };

  const getData = async () => {
    const data = await axios.get("/")
    console.log(data);
    if (data.data.success) {
      setDatalist(data.data.data)
    }
  }

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id)
    console.log(data);
    if (data.data.success) {
      getData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", editData)
    console.log(editData);
    console.log(data);
    if (data.data.success) {
      setEditSection(false)
      alert(data.data.message)
      getData()
    }
  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const setEditForm = (bn) => {
    setEditData(bn)
    setEditSection(true)
  }

  useEffect(() => {
    getData()
  }, [])

  console.log(datalist);

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
        {
          addSection && (
            // <formTable
            // handleSubmit={handleSubmit}
            // handleOnChange={handleOnChange}
            // handleClose={()=>setAddSection(false)}
            // />
            <div className="addcontainer">
              <form onSubmit={handleSubmit} method="post"> 
                <button className='close-btn' onClick={() => setAddSection(false)}><MdClose /></button> 
                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleOnChange} />

                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleOnChange} />

                <label htmlFor="number">Number : </label>
                <input type="number" id="number" name="number" value={formData.number} onChange={handleOnChange} />

                <input type="submit" value="Submit" className="btn-submit"></input>
                {/* <button className="btn-submit">Submit</button> */}
              </form>
            </div>
          )
        }
        {
          editSection && (
            <div className="addcontainer">
              <form onSubmit={handleUpdate}>
                <button className='close-btn' onClick={() => setEditSection(false)}><MdClose /></button>
                <label htmlFor="name">Name : </label>
                <input type="text" id="name" name="name" value={editData.name} onChange={handleEditOnChange} />

                <label htmlFor="email">Email : </label>
                <input type="email" id="email" name="email" value={editData.email} onChange={handleEditOnChange} />

                <label htmlFor="number">Number : </label>
                <input type="number" id="number" name="number" value={editData.number} onChange={handleEditOnChange} />

                <button className="btn-submit">Submit</button>
              </form>
            </div>
          )
        }
        <div className='addTable'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th></th>
              </tr>
            </thead>
            {
              datalist[0] ? (
                <tbody>
                  {
                    datalist.map((bn) => {
                      return (
                        <tr key={bn._id}>
                          <td>{bn.name}</td>
                          <td>{bn.email}</td>
                          <td>{bn.number}</td>
                          <td>
                            <button className='btn edit-btn' onClick={() => setEditForm(bn)}>Edit</button>
                            <button className='btn delete-btn' onClick={() => handleDelete(bn._id)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              ) : (
                <p>No data</p>
              )
            }
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
