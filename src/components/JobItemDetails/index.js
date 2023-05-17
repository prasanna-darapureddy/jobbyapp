import {Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {HiLocationMarker} from 'react-icons/hi'
import {BsFillBriefcaseFill, BsBoxArrowUpRight} from 'react-icons/bs'

import Header from '../Header'

import './index.css'

class JobItemDetails extends Component {
  state = {jobItemDetailsObject: []}

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        title: data.job_details.title,
        rating: data.job_details.rating,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        skills: data.job_details.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
      }

      this.setState({jobItemDetailsObject: updatedData})
    }
  }

  renderSkills = () => {
    const {jobItemDetailsObject} = this.state
    const {skills} = jobItemDetailsObject

    console.log(skills)
  }

  render() {
    const {jobItemDetailsObject} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      title,
      rating,
      packagePerAnnum,
      location,
    } = jobItemDetailsObject

    return (
      <>
        <div className="detailed-bg-container">
          <Header />
          <li className="job-card-container">
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
              <div className="description-head-web-container">
                <h3 className="description-heading">Description</h3>
                <Link to={`${companyWebsiteUrl}`} className="web-link">
                  <div className="visit-container">
                    <p className="visit-text">Visit</p>
                    <BsBoxArrowUpRight
                      fill="#4f46e5"
                      className="right-top-arrow"
                    />
                  </div>
                </Link>
              </div>
              <p className="job-description">{jobDescription}</p>

              <ul className="skills-container">{this.renderSkills()}</ul>
            </div>
          </li>
        </div>
      </>
    )
  }
}
export default JobItemDetails
