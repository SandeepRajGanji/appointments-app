// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentDetailsList: [],
    title: '',
    date: '',
    impAppointments: false,
  }

  onChangeText = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state

    const formattedDate = date
      ? format(new Date(date), 'dd MMMM yyyy, EEEE')
      : ''
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date: formattedDate,
        isStarred: false,
      }
      this.setState(prevState => ({
        appointmentDetailsList: [
          ...prevState.appointmentDetailsList,
          newAppointment,
        ],
        title: '',
        date: ' ',
      }))
    }
  }

  onChangeStar = id => {
    this.setState(prevState => ({
      appointmentDetailsList: prevState.appointmentDetailsList.map(
        eachAppointment => {
          if (id === eachAppointment.id) {
            return {...eachAppointment, isStarred: !eachAppointment.isStarred}
          }
          return eachAppointment
        },
      ),
    }))
  }

  onFilter = () => {
    const {impAppointments} = this.state

    this.setState({
      impAppointments: !impAppointments,
    })
  }

  getFilteredAppointmentsList = () => {
    const {appointmentDetailsList, impAppointments} = this.state

    if (impAppointments) {
      return appointmentDetailsList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentDetailsList
  }

  render() {
    const {title, date} = this.state
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="appointments-app-container">
        <div className="appointments-container">
          <div className="add-appointments-card">
            <form
              className="add-appointment-form-card"
              onSubmit={this.addAppointment}
            >
              <h1 className="add-appointments-heading">Add Appointment</h1>
              <label htmlFor="title" className="title-heading">
                TITLE
              </label>
              <input
                type="text"
                id="title"
                value={title}
                className="title-text"
                placeholder="Title"
                onChange={this.onChangeText}
              />
              <label htmlFor="date" className="date-heading">
                DATE
              </label>
              <input
                type="date"
                id="date"
                value={date}
                className="date-selection"
                placeholder="dd/mm/yyyy"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-image"
            />
          </div>
          <div className="show-appointments-container">
            <div className="show-appointment-details">
              <h1 className="show-appointments-heading">Appointments</h1>
              <button type="button" className="starred" onClick={this.onFilter}>
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  onChangeStar={this.onChangeStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
