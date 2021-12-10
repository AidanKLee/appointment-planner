import React from 'react';
import './AppointmentForm.css';

class AppointmentForm extends React.Component {
    constructor(props) {
        super(props);

        this.selectForm = this.selectForm.bind(this);
    }

    selectForm() {
        const id = 'appointmentForm';
        this.props.selectForm(id);
    }

    render() {
        return (
            <div id='appointmentAdd'>
                <h3>
                    Add Appointment
                </h3>
                <form onClick={this.selectForm} id='appointmentForm' onSubmit={this.props.handleSubmit}>
                    <ul id='appointmentFormList'>
                        <li>
                            <input name='title' type='text' placeholder='Appointment Title'  onChange={this.props.onChange}/>
                        </li>
                        <li>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/></svg>
                            <input name='contact' list='contact' placeholder='Contact' onChange={this.props.onChange}/>
                            <datalist id='contact'>
                                {this.props.contacts.map(contact => {
                                    return <option key={contact.id} value={contact.name}/>
                                })
                                }
                            </datalist>
                        </li>
                        <li>     
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z"/></svg>
                            <input name='date' type='date' placeholder='Date' onChange={this.props.onChange}/>
                        </li>
                        <li>     
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                            <input name='time' type='time' placeholder='Time' onChange={this.props.onChange}/>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"/><circle cx="12" cy="9" r="2.5"/></svg>
                            <input name='location' type='text' placeholder='Location'  onChange={this.props.onChange}/>
                        </li>
                    </ul>
                    <button className='button' type='submit'>Save</button>
                    <button onClick={this.props.handleClear} className='button' id='clear'>Clear</button>
                </form>
            </div>
        )
    }
}

export default AppointmentForm;