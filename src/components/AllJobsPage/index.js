import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobCardItem from '../JobCardItem'
import ProfileCard from '../ProfileCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsPage extends Component {
  state = {
    searchInput: '',
    profileObject: {},
    jobItemsList: [],
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileObject: updatedProfile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileObject} = this.state
    return (
      <div className="profile-container">
        <ProfileCard profileObject={profileObject} />
      </div>
    )
  }

  renderProfileFailureView = () => (
    <div className="profile-error-view-container">
      <button type="button" className="profile-retry-button">
        Retry
      </button>
    </div>
  )

  getJobsData = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/jobs'
    const token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedJobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobItemsList: updatedJobsData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchResult = () => {
    const {searchInput, jobItemsList} = this.state
    const searchedResults = jobItemsList.filter(eachRes =>
      eachRes.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchedResults
  }

  onClickSearchIcon = () => {
    /* need to edit */
  }

  renderJobItemsSuccessView = () => {
    // const {jobItemsList} = this.state
    const searchedResults = this.getSearchResult()
    const noJobs = searchedResults.length !== 0

    return noJobs ? (
      <>
        {searchedResults.map(eachJob => (
          <JobCardItem key={eachJob.id} eachJobDetails={eachJob} />
        ))}
      </>
    ) : (
      <div className="no-jobs-found-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="no-job-img"
        />
        <p className="no-jobs-found-note">No Jobs Found</p>
      </div>
    )
  }

  renderJobItemsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" height="50" width="50" />
    </div>
  )

  renderJobItemsFailureView = () => (
    <div className="jobs-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are loading for.
      </p>
      <button type="button" className="profile-retry-button">
        Retry
      </button>
    </div>
  )

  renderProfileCardView = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderJobItemsView = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobItemsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobItemsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <>
        <div className="all-jobs-main-page">
          <Header />
          <div className="jobs-main-content-container">
            <div className="profile-filters-container">
              {/* profile card */}
              {this.renderProfileCardView()}
              <hr className="line" />
              {/* job type filters content */}
              <h3 className="emp-type-heading">Type of Employment</h3>
              {employmentTypesList.map(eachType => (
                <div className="job-type-filters-container">
                  <input
                    type="checkbox"
                    className="check-box"
                    id={eachType.employmentTypeId}
                  />
                  <label
                    className="label-text"
                    htmlFor={eachType.employmentTypeId}
                  >
                    {eachType.label}
                  </label>
                </div>
              ))}
              <hr className="line" />
              {/* salary range filters content */}
              <h3 className="salary-range-heading">Salary Range</h3>
              {salaryRangesList.map(eachRange => (
                <div className="salary-filters-container">
                  <input
                    type="checkbox"
                    className="check-box"
                    id={eachRange.salaryRangeId}
                  />
                  <label
                    className="label-text"
                    htmlFor={eachRange.salaryRangeId}
                  >
                    {eachRange.label}
                  </label>
                </div>
              ))}
            </div>

            {/* job cards container content */}

            <div className="all-job-items-container">
              {/* search bar content */}
              <div className="search-bar-container">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className="search-icon-button"
                  data-testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <BiSearch fill="#fff" className="search-symbol" />
                </button>
              </div>
              {/* job cards content */}
              <ul className="cards-list-container">
                {this.renderJobItemsView()}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default AllJobsPage
