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

const FilterItems = props => {
  const {updateSalaryRange, updateChecksList, activeSalaryId} = props

  const renderEmploymentTypes = () => (
    <div className="emp-types-container">
      <h1 className="emp-types-title">Type of Employment</h1>
      <ul className="types-list">
        {employmentTypesList.map(each => {
          const {label, employmentTypeId} = each
          const onChangeChecksList = () => {
            updateChecksList(employmentTypeId)
          }
          return (
            <li key={employmentTypeId} className="emp-type-item">
              <input
                type="checkbox"
                id={employmentTypeId}
                onChange={onChangeChecksList}
              />
              <label htmlFor={employmentTypeId} className="emp-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  const renderSalaryRangeList = () => (
    <div className="emp-types-container">
      <h1 className="emp-types-title">Salary Range</h1>
      <ul className="types-list">
        {salaryRangesList.map(each => {
          const {salaryRangeId, label} = each
          const onChangeSalaryRange = () => {
            updateSalaryRange(salaryRangeId)
          }

          return (
            <li key={salaryRangeId} className="emp-type-item">
              <input
                type="radio"
                id={salaryRangeId}
                checked={activeSalaryId === each.salaryRangeId}
                onChange={onChangeSalaryRange}
              />
              <label htmlFor={salaryRangeId} className="emp-label">
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return (
    <div>
      {renderEmploymentTypes()}
      <hr className="horizontal-line" />
      {renderSalaryRangeList()}
    </div>
  )
}

export default FilterItems
