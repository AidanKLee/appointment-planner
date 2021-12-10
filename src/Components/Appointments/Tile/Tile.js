import React from 'react';
import './Tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectForm = this.selectForm.bind(this);
    }

    toggleEdit() {
        this.props.editing();
        this.props.edit ? this.setState({edit: false}) : this.setState({edit:true});
        this.state.edit ? this.props.isEditing(false) : this.props.isEditing(true, this.props.appointment);
    }

    handleEdit(e) {
        const editAppointment = this.props.appointment;
        this.props.onChange(e, editAppointment)
    }

    handleDelete() {
        this.props.deleteAppointment(this.props.appointment)
    }

    handleSubmit(e) {
        this.props.handleEditSubmit(e)
        if (!this.props.handleEditSubmit(e)) {
                this.toggleEdit();
        }
    }

    selectForm() {
        const id = 'appTileForm';
        this.props.selectForm(id);
    }

    render() {
        return (
            <li className='appointmentTiles'>
            {!this.state.edit ? 
                <div>
                    {this.props.expired(this.props.appointment.date, this.props.appointment.time) ?
                        <p id='tileExpired'>EXPIRED</p> :
                        ''
                    }
                    
                    <h4>
                        {this.props.appointment.title}
                    </h4>
                    <p>
                        at {this.props.appointment.location}
                    </p>
                    <p>
                        with {this.props.appointment.contact}
                    </p>
                    <p>
                        on {new Date(this.props.appointment.date).toLocaleDateString("en-UK")}
                    </p>
                    <p>
                        starting at {this.props.appointment.time}
                    </p>
                </div> :
                <div>
                    <form id='appTileForm' onClick={this.selectForm} onSubmit={this.handleSubmit}>
                        <ul id='appointmentEdit'>
                            <li>
                                <input className='h4' name='title' type='text' placeholder='Appointment Title' defaultValue={this.props.appointment.title}/>
                            </li>
                            <li>
                                <input name='contact' list='contact' placeholder='Contact' onChange={this.props.onChange} defaultValue={this.props.appointment.contact}/>
                                <datalist id='contact'>
                                    {this.props.contacts.map(contact => {
                                        return <option key={contact.id} value={contact.name}/>
                                    })
                                    }
                                </datalist>
                            </li>
                            <li>
                                <input name='date' type='date' placeholder='Date' onChange={this.props.onChange} defaultValue={this.props.appointment.date}/>
                            </li>
                            <li>
                                <input name='time' type='time' placeholder='Time' onChange={this.props.onChange} defaultValue={this.props.appointment.time}/>
                            </li>
                            <li>
                                <input name='location' type='text' placeholder='Location' defaultValue={this.props.appointment.location}/>
                            </li>
                        </ul>
                        <button type='submit'>Update</button>
                    </form>
                </div>
            }
                
                <div className='contactTileImgWrapper'>
                    {this.state.edit ? 
                        <svg onClick={this.toggleEdit} className='contactTileImg red' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg> :
                        <svg onClick={this.toggleEdit} className='contactTileImg blue' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/></svg>
                    }
                    <svg onClick={this.handleDelete} className='contactTileImg red' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>
                </div>
            </li>
        )
    }
}

export default Tile;