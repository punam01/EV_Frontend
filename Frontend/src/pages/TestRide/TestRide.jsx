import React from 'react'
import './TestRide.css'
const TestRide = () => {
    return (
        <div className='test-drive-container'>
            <h2 className='page-heading'>Demo Drive</h2>
            <p>Experience Full Self-Driving (Supervised), Learn About Charging and Get All Your Questions Answered</p>
            <div className='zipcode-container'>
                <h3>Find Location and Time</h3>
                <span>Zip Code:<button><u>401107</u></button></span>
            </div>
            <div className='schedule-content'>
                <div className="schedule-data">
                    <div className="location-container">
                        <span>Select Location</span>
                        <div className="location-card-container">
                            <div className="location-card active">
                                <p className="location-name">MUMBAI, MH, IN</p>
                                <span className="location-address">Dashisar East Borivali</span>
                            </div>
                            <div className="location-card">
                                <p className="location-name">MUMBAI, MH, IN</p>
                                <span className="location-address">Dashisar East Borivali</span>
                            </div>
                            <div className="location-card">
                                <p className="location-name">MUMBAI, MH, IN</p>
                                <span className="location-address">Dashisar East Borivali</span>
                            </div>
                            <div className="location-card">
                                <p className="location-name">MUMBAI, MH, IN</p>
                                <span className="location-address">Dashisar East Borivali</span>
                            </div>
                            <div className="location-card">
                                <p className="location-name">MUMBAI, MH, IN</p>
                                <span className="location-address">Dashisar East Borivali</span>
                            </div>
                        </div>
                    </div>
                    <form>
                        <div className="form-layout">
                            <div className="form-item">
                                <label htmlFor="" className="form-label">Date</label>
                                <div className="form-input">
                                    <input type="date" className='form-input-text' />
                                </div>
                            </div>
                            <div className="form-item">
                                <label htmlFor="" className="form-label">Time</label>
                                <div className="form-input">
                                    <select name="cars" id="cars" className='form-input-text'>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="mercedes">Mercedes</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="content-container">
                <h3>Contact Information</h3>
                <div className="forms-inner-container">
                    <form action="">
                        <div className="form-container">
                            <div className="form-layout">
                                <div className="form-item">
                                    <label htmlFor="" className="form-label">First name</label>
                                    <div className="form-input">
                                        <input type="text" className='form-input-text' />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-label">Last name</label>
                                    <div className="form-input">
                                        <input type="text" className='form-input-text' />
                                    </div>
                                </div>
                            </div>
                            <div className="form-layout">
                                <div className="form-item">
                                    <label htmlFor="" className="form-label">Email address</label>
                                    <div className="form-input">
                                        <input type="email" className='form-input-text' validate />
                                    </div>
                                </div>
                                <div className="form-item">
                                    <label htmlFor="" className="form-label">Phone Number</label>
                                    <div className="form-input">
                                        <input type="tel" className='form-input-text' validate/>
                                    </div>
                                </div>
                            </div>
                            <div className="checkbox-group">
                                <input type="checkbox" name="" id="" />
                                <span>Learn about Electric Vehicles</span>
                            </div>
                        </div>
                        <p className='disclaimer-txt'>
                            <span>By continuing, I agree to the{" "}</span>
                            <a href=''>Terms and Conditions</a>
                        </p>
                        <div className='btn-conatiner'>
                            <button type='submit'>Schedule Test Drive</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TestRide
