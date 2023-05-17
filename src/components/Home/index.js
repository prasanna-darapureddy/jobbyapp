import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <>
    <div className="home-page-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, Salary Information, Company
          Reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default Home
