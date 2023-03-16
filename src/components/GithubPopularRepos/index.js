import './index.css'

import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,
    isLoading: false,
    repoList: [],
  }

  componentDidMount() {
    this.getPopularLanguages()
  }

  getPopularLanguages = async () => {
    this.setState({isLoading: true})
    const {activeLanguage} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`

    try {
      const response = await fetch(apiUrl)
      if (response.ok === true) {
        const data = await response.json()
        const updateData = data.popular_repos.map(eachRepo => ({
          avatarUrl: eachRepo.avatar_url,
          forksCount: eachRepo.forks_count,
          issuesCount: eachRepo.issues_count,
          id: eachRepo.id,
          starsCount: eachRepo.stars_count,
          name: eachRepo.name,
        }))
        this.setState({isLoading: false, repoList: updateData})
      }
    } catch {
      this.setState({isLoading: false, repoList: []})
    }
  }

  changeActiveLanguage = id => {
    this.setState(
      {activeLanguage: id, isLoading: true},
      this.getPopularLanguages,
    )
  }

  loader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  displayReposList = () => {
    const {repoList} = this.state
    if (repoList.length === 0) {
      return (
        <div className="failure-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="fail-image"
          />
          <h1>Something Went Wrong</h1>
        </div>
      )
    }
    return (
      <ul className="repo-container">
        {repoList.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {activeLanguage, isLoading} = this.state
    return (
      <div className="bg-container">
        <h1 className="popular">Popular</h1>
        <ul className="filter-languages-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              activeLanguage={activeLanguage}
              details={each}
              changeActiveLanguage={this.changeActiveLanguage}
              key={each.id}
            />
          ))}
        </ul>
        {isLoading ? this.loader() : this.displayReposList()}
      </div>
    )
  }
}

export default GithubPopularRepos
