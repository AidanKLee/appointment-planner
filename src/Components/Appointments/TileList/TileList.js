import React from 'react';
import './TileList.css';
import Tile from '../Tile/Tile';

class AppointmentList extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.props.sortByDate();
        }
    }  

    render() {
        return (
            <ul>
                {this.props.appointments.map(appointment => {
                    return <Tile 
                        key={appointment.id}
                        appointment={appointment}
                        appointments={this.props.appointments}
                        contacts={this.props.contacts}
                        deleteAppointment={this.props.deleteAppointment}
                        onChange={this.props.onChange}
                        isEditing={this.props.isEditing}
                        handleEditSubmit={this.props.handleEditSubmit}
                        required={this.props.required}
                        selectForm={this.props.selectForm}
                        editing={this.props.editing}
                        edit={this.props.edit}
                        sortByDate={this.props.sortByDate}
                        expired={this.props.expired}
                    />
                })}
            </ul>
        )
    }
}

export default AppointmentList;