import React from 'react';
import './TileList.css';
import Tile from '../Tile/Tile';

class ContactList extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.props.sortByName();
        }
    }        

    render() {
        return (
            <div id='contactList'>
                <h3>
                    Contact List
                </h3>
                <ul>
                    {this.props.contacts.map(contact => {
                        return <Tile 
                            key={contact.id} 
                            contact={contact} 
                            contacts={this.props.contacts}
                            deleteContact={this.props.deleteContact} 
                            onChange={this.props.onChange}
                            isEditing={this.props.isEditing}
                            handleEditSubmit={this.props.handleEditSubmit}
                            duplicate={this.props.duplicate}
                            required={this.props.required}
                            selectForm={this.props.selectForm}
                            editing={this.props.editing}
                            edit={this.props.edit}
                            birthday={this.props.birthday}
                            dateTime={this.props.dateTime}
                            />
                    })}
                </ul>
            </div>
        )
    }
}

export default ContactList;