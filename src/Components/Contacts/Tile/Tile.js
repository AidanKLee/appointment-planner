import React from "react";
import './Tile.css';

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hovered: false,
            edit: false,
        }

        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectForm = this.selectForm.bind(this);
    }

    toggleEdit() {
        this.props.editing();
        this.props.edit ? this.setState({edit: false}) : this.setState({edit: true});
        
        // this.state.edit ? this.setState({edit: false}) : this.setState({edit: true});
        this.state.edit ? this.props.isEditing(false) : this.props.isEditing(true, this.props.contact);
    }

    handleEdit(e) {
        const editContact = this.props.contact;
        this.props.onChange(e, editContact)
    }

    handleHover() {
        this.setState({hovered: true})
    }

    handleMouseLeave() {
        this.setState({hovered: false})
    }

    handleDelete() {
        this.props.deleteContact(this.props.contact)
    }

    handleSubmit(e) {
        this.props.handleEditSubmit(e)
        if (!this.props.handleEditSubmit(e)) {
                this.toggleEdit();
        }
    }

    selectForm() {
        const id = 'tileForm';
        this.props.selectForm(id);
    }

    render() {
        return (
            <li className='contactTile' onMouseEnter={this.handleHover} onMouseLeave={this.handleMouseLeave}>
                {!this.state.edit ?
                    <div>
                        <h4>
                        {this.props.contact.name}
                        <span id='birthday'>{this.props.birthday(this.props.contact) ? ' is ' + (this.props.dateTime.getUTCFullYear() - new Date(this.props.contact.birthday).getUTCFullYear()) + ' today!' : ''}</span>
                        </h4> 
                        <p><strong>Phone: </strong>{this.props.contact.phone} | <strong>E-Mail: </strong>{this.props.contact.email}</p>
                        {this.state.hovered ? 
                        <div>
                            {this.props.contact.birthday ? <p><strong>Birthday: </strong>{new Date(this.props.contact.birthday).toLocaleDateString("en-UK")}</p> : ''}
                            {this.props.contact.address ? <p><strong>Address: </strong>{this.props.contact.address}</p> : ''}
                            {this.props.contact.relationships ? <p><strong>Relationships: </strong>{this.props.contact.relationships}</p> : ''}
                            {this.props.contact.workInfo ? <p><strong>Work: </strong>{this.props.contact.workInfo}</p> : ''}
                            {this.props.contact.website ? <p><strong>Website: </strong><a target='blank' href={this.props.contact.website}>{this.props.contact.website}</a></p> : ''}
                            {this.props.contact.facebook ? <p><strong>Facebook: </strong><a target='blank' href={this.props.contact.facebook}>{this.props.contact.facebook}</a></p> : ''}
                            {this.props.contact.instagram ? <p><strong>Instagram: </strong><a target='blank' href={this.props.contact.instagram}>{this.props.contact.instagram}</a></p> : ''}
                            {this.props.contact.linkedin ? <p><strong>LinkedIn: </strong><a target='blank' href={this.props.contact.linkedin}>{this.props.contact.linkedin}</a></p> : ''}
                            {this.props.contact.twitter ? <p><strong>Twitter: </strong><a target='blank' href={this.props.contact.twitter}>{this.props.contact.twitter}</a></p> : ''}
                            {this.props.contact.youtube ? <p><strong>YouTube: </strong><a target='blank' href={this.props.contact.youtube}>{this.props.contact.youtube}</a></p> : ''}
                        </div> : ''
                        }
                    </div> :
                    <div id='contactTileForm'>
                        <form onClick={this.selectForm} id='tileForm' onSubmit={this.handleSubmit}>
                            <input className='h4' name='name' type='text' placeholder='Name' defaultValue={this.props.contact.name} onChange={this.handleEdit}/>
                            <strong>Phone: </strong><input name='phone' type='tel' placeholder='Telephone' defaultValue={this.props.contact.phone} onChange={this.handleEdit}/>
                            <strong>E-Mail: </strong><input name='email' type='email' placeholder='E-Mail' defaultValue={this.props.contact.email} onChange={this.handleEdit}/>
                            <strong>Birthday: </strong><input name='birthday' type='date' placeholder='Birthday' defaultValue={this.props.contact.birthday} onChange={this.handleEdit}/>
                            <strong>Address: </strong><input name='address' type='text' placeholder='Address' defaultValue={this.props.contact.address} onChange={this.handleEdit}/>
                            <strong>Relationships: </strong><input name='relationships' type='text' placeholder='Relationships' defaultValue={this.props.contact.relationships} onChange={this.handleEdit}/>
                            <strong>Work: </strong><input name='workInfo' type='text' placeholder='Work Info' defaultValue={this.props.contact.workInfo} onChange={this.handleEdit}/>
                            <strong>Website: </strong><input name='website' type='url' placeholder='Website' defaultValue={this.props.contact.website} onChange={this.handleEdit}/>
                            <strong>Facebook: </strong><input name='facebook' type='url' placeholder='Facebook' defaultValue={this.props.contact.facebook} onChange={this.handleEdit}/>
                            <strong>Instagram: </strong><input name='instagram' type='url' placeholder='Instagram' defaultValue={this.props.contact.instagram} onChange={this.handleEdit}/>
                            <strong>LinkedIn: </strong><input name='linkedin' type='url' placeholder='LinkedIn' defaultValue={this.props.contact.linkedin} onChange={this.handleEdit}/>
                            <strong>Twitter: </strong><input name='twitter' type='url' placeholder='Twitter' defaultValue={this.props.contact.twitter} onChange={this.handleEdit}/>
                            <strong>YouTube: </strong><input name='youtube' type='url' placeholder='YouTube' defaultValue={this.props.contact.youtube} onChange={this.handleEdit}/>
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