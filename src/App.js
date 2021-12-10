import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './Containers/Nav/Nav';
// import Home from './Containers/Home/Home';
import Contacts from './Containers/Contacts/Contacts';
import Appointments from './Containers/Appointments/Appointments';
import MenuNav from './Components/Nav/MenuNav/MenuNav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        // {name: 'Aidan Lee', email: 'aidankglee@googlemail.com', phone: '07960512375', id: '0Hy6JUjhY6Hy7JHV'},
        // {name: 'Eliot Lee', email: 'eliotklee@googlemail.com', phone: '07583968573', id: '8JHbgTujmJy6h7j3'},
        // {name: 'Jade Davey', email: 'jade.davey@googlemail.com', phone: '07593867584', id: '6HnVfRtJiuHgRTt6'},
        // {name: 'Sophie Hamilton', email: 'sophiehamilton@googlemail.com', phone: '07975437292', id: '7HYTG765HY67JU87'},
      ],
      appointments: [
        // {title: 'Date Night', contact: 'Jade Davey', date: '2021-12-12', time: '17:00', location: 'London', id: '7HYTG765HY4gt56y'},
        // {title: 'Dinner With Family', contact: 'Eliot Lee', date: '2021-11-12', time: '18:00', location: 'Eliots House, Harlow', id: '7HYTG765HYfry657'},
        // {title: 'Meeting 1', contact: 'Contact', date: '2022-12-01', time: '18:00', location: 'Location', id: '7HYTG765HY67JU87'},
        // {title: 'Meeting 2', contact: 'Contact', date: '2020-12-14', time: '18:00', location: 'Location', id: '7HYTG765HY67JUbf'},
        // {title: 'Meeting 3', contact: 'Contact', date: '2021-06-03', time: '18:00', location: 'Location', id: '7HYTG765HY67JU4r'},
        // {title: 'Meeting 4', contact: 'Contact', date: '2022-08-08', time: '18:00', location: 'Location', id: '7HYTG765HY67JUg4'},
        // {title: 'Meeting 5', contact: 'Contact', date: '2024-06-17', time: '18:00', location: 'Location', id: '7HYTG765H5h7JU87'},
        // {title: 'Meeting 6', contact: 'Contact', date: '2020-10-05', time: '18:00', location: 'Location', id: '7HYTG765H5y7JU85'},
        // {title: 'Meeting 7', contact: 'Contact', date: '2022-03-10', time: '18:00', location: 'Location', id: '7HYTG764rY67JU5h'},
        // {title: 'Meeting 8', contact: 'Contact', date: '2021-12-03', time: '18:00', location: 'Location', id: '7HYTG765H557JUg4'},
      ],
      menuOpen: false,
      dateTime: new Date(),
    }

    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.editContact = this.editContact.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.editAppointment = this.editAppointment.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.createId = this.createId.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.dateExpired = this.dateExpired.bind(this);
    this.birthday = this.birthday.bind(this);
  }

  addContact(contact) {
    this.setState(prev => ({
      contacts: [...prev.contacts, contact]
    }));
  };

  editContact(newContacts) {
    this.setState ({
      contacts: newContacts,
    })
  }

  deleteContact(contact) {
    this.setState({
      contacts: this.state.contacts.filter(cont => {
        return cont.name !== contact.name;
    })})
  }

  addAppointment(appointment) {
    this.setState(prev => ({
      appointments: [...prev.appointments, appointment]
    }));
  };

  editAppointment(newAppointments) {
    this.setState ({
      appointments: newAppointments,
    })
  }

  deleteAppointment(appointment) {
    this.setState({
      appointments: this.state.appointments.filter(app => {
        return app.title !== appointment.title;
    })})
  }

  createId(arr) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const idTaken = (id, array) => {
      let taken = false;
      array.forEach(object => {
        if (id === object.id) {
          taken = true;
        }
      })
      return taken;
    }
    let id = '';

    while (idTaken(id, arr) || id.length < 16) {
      for (let i = 0; i < 17; i ++) {
        const rand = Math.floor(Math.random() * possible.length)
        let character = possible.charAt(rand)
        id = id + character
      }
    }

    return id;
  }

  sortByName() {
    this.state.contacts.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  sortByDate() {
    this.state.appointments.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    });
  }

  toggleMenu() {
    this.state.menuOpen ? this.setState({menuOpen: false}) : this.setState({menuOpen: true})
  }

  dateExpired(date, time) {
    if (this.state.dateTime > new Date(date + ' ' + time)) {
      return true;
    }
  }

  birthday(contact) {
    const bDay = new Date(contact.birthday).getUTCDate();
    const bMonth = new Date(contact.birthday).getUTCMonth() + 1;
    const tDay = this.state.dateTime.getUTCDate();
    const tMonth = this.state.dateTime.getUTCMonth() +1;
    if (bDay === tDay && bMonth === tMonth) {
      return true;
    }
  }

  componentDidMount(prevState) {
    this.interval = setInterval(() => {
      this.setState({dateTime: new Date()})
      // console.log(this.state.dateTime)
    }, 1000)
  }

  render() {
    return (
      <Router>
        <div id='bodyWrapper'>
          <Nav toggleMenu={this.toggleMenu} menuOpen={this.state.menuOpen}/>
          {this.state.menuOpen ? <MenuNav /> : ''}
          
          <main>
            <Routes>
              {/* <Route 
                path='/' 
                element={<Home
                  contacts={this.state.contacts}
                  appointments={this.state.appointments}
                  addContact={this.addContact}
                  addAppointment={this.addAppointment}
                  sortByName={this.sortByName}
                  sortByDate={this.sortByDate}
                />}
              /> */}
              <Route 
                path='/' exact
                element={<Contacts
                  contacts={this.state.contacts}
                  addContact={this.addContact}
                  deleteContact={this.deleteContact}
                  editContact={this.editContact}
                  sortByName={this.sortByName}
                  createId={this.createId}
                  birthday={this.birthday}
                  dateTime={this.state.dateTime}
                />}
              />
              <Route 
                path='/appointments' 
                element={<Appointments
                  appointments={this.state.appointments}
                  contacts={this.state.contacts}
                  addAppointment={this.addAppointment}
                  editAppointment={this.editAppointment}
                  deleteAppointment={this.deleteAppointment}
                  createId={this.createId}
                  sortByDate={this.sortByDate}
                  expired={this.dateExpired}
                />}
              />
            </Routes>
          </main>
        </div>
      </Router>
    )
  }
}

export default App;
