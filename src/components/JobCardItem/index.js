import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCardItem = props => {
  const {eachJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
    id,
  } = eachJobDetails

  return (
    <>
      <li className="job-card-container">
        <Link to={`/jobs/${id}`} className="job-card-link">
          <div className="logo-position-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="card-logo"
            />
            <div className="position-description-container">
              <p className="position">{title}</p>
              <div className="rating-container">
                {/* star icon */}
                <AiFillStar fill="#fbbf24" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-salary-container">
            <div className="location-job-type-container">
              <div className="location-container">
                {/* location icon */}
                <HiLocationMarker fill="#fff" />
                <p className="location">{location}</p>
              </div>
              <div className="job-type-container">
                {/* suitcase icon */}
                <BsFillBriefcaseFill fill="#fff" />
                <p className="job-type">{employmentType}</p>
              </div>
            </div>
            <p className="salary-text">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-container">
            <h3 className="description-heading">Description</h3>
            <p className="job-description">{jobDescription}</p>
          </div>
        </Link>
      </li>
    </>
  )
}
export default JobCardItem
