// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {activeLanguage, details, changeActiveLanguage} = props
  const {language, id} = details

  const btnStyle = activeLanguage === language ? 'active-btn' : ''

  const changeLan = () => {
    changeActiveLanguage(id)
  }

  return (
    <li>
      <button type="button" className={`btn ${btnStyle}`} onClick={changeLan}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
