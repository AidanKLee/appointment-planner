import React from 'react';
import './Appointments.css';
import AppointmentForm from '../../Components/Appointments/AppointmentForm/AppointmentForm';
import TileList from '../../Components/Appointments/TileList/TileList';

class Appointments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointment: {
                id: '',
                title: '',
                contact: '',
                date: '',
                time: '',
                location: ''
            },
            editedAppointment: {},
            required: false,
            edit: false,
            addAppointment: true
        }

        this.toggleAppointmentMenu = this.toggleAppointmentMenu.bind(this);
        this.isRequired = this.isRequired.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.filterAppointments = this.filterAppointments.bind(this);
        this.isEditing = this.isEditing.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleWarning = this.handleWarning.bind(this);
        this.selectForm = this.selectForm.bind(this);
        this.editing = this.editing.bind(this);
    }

    initialState = {
        id: '',
        title: '',
        contact: '',
        date: '',
        time: '',
        location: ''
    }

    toggleAppointmentMenu() {
        this.state.addAppointment ? this.setState({addAppointment: false}) : this.setState({addAppointment: true})
    }

    editing() {
        this.state.edit ? this.setState({edit: false}) : this.setState({edit: true})
    }

    isEditing(editState, editAppointment) {
        this.setState({edit: editState});
        if (editState) {
            this.setState({
                appointment: editAppointment,
            }, () => {
                this.setState({
                    editedAppointment: this.state.appointment,
                })
            })
        } else {
            this.setState({
                appointment: this.initialState,
            }, () => {
                this.setState({
                    editedappointment: {},
                })
            })
        }
    }

    filterAppointments(appointmentToEdit) {
        if (appointmentToEdit) {
            return this.props.appointments.filter(appointment => appointment.id !== appointmentToEdit.id);
        } else {
            return this.props.appointments;
        }
    }

    handleChange(e, editAppointment) {
        const value = e.target.value;
        this.setState(prev => ({
            appointment: {
                ...prev.appointment,
                [e.target.name]: value
            }
        }));
    }

    isRequired() {
        const appointment = this.state.appointment;
        if (!appointment.title || !appointment.contact || !appointment.date || !appointment.time || !appointment.location) {
            this.setState({required: true})
            const timeout = setTimeout(() => {
                this.setState({required: false});
                clearTimeout(timeout)
            }, 5000);
            
            return true;
        }
    }

    handleEditSubmit(e) {
        e.preventDefault();
        if (this.isRequired()) {
            return true;
        };
        if (this.props.appointments.length > 1 && this.state.editedAppointment !== this.state.appointment) {
            let newAppointments = this.filterAppointments(this.state.editedAppointment);
            newAppointments = [...newAppointments, this.state.appointment]
            this.props.editAppointment(newAppointments);
        } else if (this.props.appointments.length === 1 && this.state.editedAppointment !== this.state.appointment) {
            this.props.editAppointment([this.state.appointment])
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isRequired()) {
            return;
        };
        this.setState(prev => ({
            appointment: {
                ...prev.appointment,
                id: this.props.createId(this.props.appointments)
            }
        }), () => {
            this.props.addAppointment(this.state.appointment);
            this.handleClear(e);
        })       
    }

    handleWarning() {
        this.setState({required: false});
    }

    handleClear(e) {
        e.preventDefault();
        Array.from(document.querySelectorAll('#appointmentForm input')).forEach(input => {
            input.value = '';
        })
        this.setState({
            appointment:
                this.initialState
        })
    }

    selectForm(form) {
        const id = this.state.appointment.id
        this.setState({
            appointment: this.initialState
        }, () => {
            this.setState(prev => ({
                appointment: {
                    ...prev.appointment,
                    id: id
                }
            }))
        })
        let newForm = document.forms[form];
        let data = new FormData(newForm);

        data.forEach((value, key) => {
            this.setState(prev => ({
                appointment: {
                    ...prev.appointment,
                    [key]: value,
                }
            }))
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props && prevState !== this.state) {
            
        }
    }

    render() {
        return (
            <div id='appointments'>
            <div id='appointmentsHeading'>
            <h2>Appointments</h2>
                {this.state.addAppointment ?
                    <svg onClick={this.toggleAppointmentMenu} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg> :
                    <svg onClick={this.toggleAppointmentMenu} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                }
                
            {this.state.required ? 
                <div className='warning'>

                {this.state.required ?
                    <p className='smallPrint'>
                        All fields are required.
                    </p>
                    : ''
                }

                <button onClick={this.handleWarning} className='warningButton'>OK</button>

                </div> : ''
            }
                
            </div>
                <div id='appointmentsSectionWrapper'>
                    {this.state.addAppointment ?
                        <section id='appointmentForm'>
                            <AppointmentForm
                                contacts={this.props.contacts}
                                onChange={this.handleChange}
                                handleClear={this.handleClear}
                                handleSubmit={this.handleSubmit}
                                required={this.state.required}
                                edit={this.state.edit}
                                selectForm={this.selectForm}
                            />
                        </section> :
                        ''  
                    }
                    {this.props.appointments.length !== 0 ?
                        <section id='appointmentList' style={this.state.addAppointment ? {width: 'calc(100% - 260px)'} : {width: '100%'}}>
                            <TileList
                                contacts={this.props.contacts}
                                appointments={this.props.appointments}
                                deleteAppointment={this.props.deleteAppointment}
                                onChange={this.handleChange} 
                                isEditing={this.isEditing}
                                handleEditSubmit={this.handleEditSubmit}
                                required={this.state.required}
                                selectForm={this.selectForm}
                                editing={this.editing}
                                edit={this.state.edit}
                                sortByDate={this.props.sortByDate}
                                expired={this.props.expired}
                            />
                        </section> :
                        <section id='appointmentList' style={this.state.addAppointment ? {width: 'calc(100% - 260px)'} : {width: '100%'}}>
                            <h5>You Have No Appointmens</h5>
                        </section>
                    }
                    
                </div>
            </div>
        )
    }
}

export default Appointments;