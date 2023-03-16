// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, name, starsCount, issuesCount, forksCount} = details

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="image" />
      <h1 className="heading">{name}</h1>
      <div className="para-container">
        <p className="para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="icon"
          />
          {` ${starsCount} stars`}
        </p>
        <p className="para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          {` ${forksCount} forks`}
        </p>
        <p className="para">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          {` ${issuesCount} issues`}
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
