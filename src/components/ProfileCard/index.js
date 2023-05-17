import './index.css'

const ProfileCard = props => {
  const {profileObject} = props
  const {profileImageUrl, name, shortBio} = profileObject

  return (
    <>
      <img src={profileImageUrl} alt="profile" className="avatar" />
      <p className="name">{name}</p>
      <p className="short-bio">{shortBio}</p>
    </>
  )
}
export default ProfileCard
