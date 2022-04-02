// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onChangeStar} = props
  const {title, date, isStarred, id} = appointmentDetails
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeStar = () => {
    onChangeStar(id)
  }
  return (
    <li className="appointment-details">
      <div className="appointment-details-heading">
        <p className="title-name">{title}</p>
        <button
          type="button"
          testid="star"
          className="star"
          onClick={changeStar}
        >
          <img src={imageUrl} alt="star" />
        </button>
      </div>
      <p className="appointment-timing">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
