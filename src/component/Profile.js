import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const initialProfiles = [
  { id: 1, name: "John Doe", age: 30, job: "Software Engineer", salary: "$80,000",location:"pune", hobbies: "Reading, Traveling", photo: "/imag1.jpeg", description: "Experienced software developer", lat: 37.7749, lng: -122.4194 },
  { id: 2, name: "Jane Smith", age: 28, job: "Data Scientist", salary: "$90,000",location:"chennai", hobbies: "Hiking, Cooking", photo: "/image2.jpeg", description: "Data enthusiast", lat: 40.7128, lng: -74.006 },
  { id: 3, name: "Alice Brown", age: 26, job: "UX Designer", salary: "$75,000",location:"kolkata", hobbies: "Sketching, Gaming", photo: "/image3.jpeg", description: "Creative UI/UX designer", lat: 34.0522, lng: -118.2437 },
  { id: 4, name: "Michael Johnson", age: 35, job: "Product Manager", salary: "$100,000",location:"hydrabad", hobbies: "Cycling, Reading", photo: "/image4.jpeg", description: "Strategic product planner", lat: 51.5074, lng: -0.1278 },
  { id: 5, name: "Emily Davis", age: 29, job: "AI Researcher", salary: "$95,000",location:"mubai", hobbies: "Chess, Music", photo: "/image5.jpeg", description: "Passionate AI scientist", lat: 48.8566, lng: 2.3522 }
];

function ProfileList({ profiles, setProfiles }) {
  const [search, setSearch] = useState("");
  const filteredProfiles = profiles.filter((profile) => profile.name.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    setProfiles(profiles.filter(profile => profile.id !== id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 text-primary">Profile Viewer</h1>
      <div className="mb-3 d-flex justify-content-center">
        <input 
          type="text" 
          className="form-control w-50 me-2" 
          placeholder="Search profiles..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
        <button className="btn btn-outline-primary" onClick={() => setSearch("")}>Clear</button>
      </div>
      <Link to="/add" className="btn btn-success mb-3">Add Profile</Link>
      <div className="row">
        {filteredProfiles.map((profile) => (
          <div className="col-md-4" key={profile.id}>
            <div className="card shadow-lg border-0 mb-4">
              <img src={profile.photo} className="card-img-top rounded-top" alt={profile.name} style={{ height: "250px", objectFit: "cover" }} />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold text-dark">{profile.name}</h5>
                <h5  className="card-title fw-bold text-dark">{profile.location}</h5>
                <p className="card-text text-muted">{profile.description}</p>
                <Link to={`/profile/${profile.id}`} className="btn btn-primary btn-sm">View Details</Link>
                <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(profile.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {filteredProfiles.length === 0 && <p className="text-center text-danger">No profiles found</p>}
      </div>
    </div>
  );
}

function ProfileDetails() {
  let { id } = useParams();
  const profile = initialProfiles.find((p) => p.id === parseInt(id));
  if (!profile) return <h2 className="text-center mt-4 text-danger">Profile not found</h2>;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 p-4">
        <h2 className="text-center fw-bold text-primary">{profile.name}</h2>
        <img src={profile.photo} alt={profile.name} className="img-fluid mx-auto d-block rounded-circle" style={{ width: "200px", height: "200px", objectFit: "cover" }} />
        <div className="text-center mt-3">
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Job:</strong> {profile.job}</p>
          <p><strong>Salary:</strong> {profile.salary}</p>
          <p><strong>Salary:</strong> {profile.location}</p>
          <p><strong>Hobbies:</strong> {profile.hobbies}</p>
        </div>
        <h3 className="text-center mt-4">Location</h3>
        <iframe
          width="100%"
          height="400"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9:0x921f6aaa74197fdb!2sSacramento,%20CA,%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd${profile.lat},${profile.lng}`}
          allowFullScreen
          loading="lazy"
        ></iframe>
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-secondary">Back to Profiles</Link>
        </div>
      </div>
    </div>
  );
}

function AddEditProfile({ profiles, setProfiles }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", job: "", salary: "", hobbies: "", photo: "", description: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfiles([...profiles, { id: profiles.length + 1, ...form }]);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-success">Add Profile</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <input type="text" className="form-control mb-2" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="number" className="form-control mb-2" placeholder="Age" onChange={(e) => setForm({ ...form, age: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Job" onChange={(e) => setForm({ ...form, job: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Salary" onChange={(e) => setForm({ ...form, salary: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Hobbies" onChange={(e) => setForm({ ...form, hobbies: e.target.value })} required />
        <input type="text" className="form-control mb-2" placeholder="Photo URL" onChange={(e) => setForm({ ...form, photo: e.target.value })} required />
        <textarea className="form-control mb-2" placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit" className="btn btn-success w-100">Add Profile</button>
      </form>
    </div>
  );
}

function App() {
  const [profiles, setProfiles] = useState(initialProfiles);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProfileList profiles={profiles} setProfiles={setProfiles} />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/add" element={<AddEditProfile profiles={profiles} setProfiles={setProfiles} />} />
      </Routes>
    </Router>
  );
}

export default App;
