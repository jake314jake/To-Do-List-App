import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NameInput = () => {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const userNameTrimmed = e.target.value.trim();
    setUserName(userNameTrimmed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/tasks', { state: { userName } });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title">Enter Your Name</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    placeholder="John Doe"
                    value={userName}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={userName === ''}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInput;
