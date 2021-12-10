import React from 'react';
import './Contacts.css'
import ContactForm from '../../Components/Contacts/ContactForm/ContactForm';
import ContactList from '../../Components/Contacts/TileList/TileList';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                id: '',
                name: '',
                phone: '',
                email: '',
                address: '',
                workInfo: '',
                website: '',
                birthday: '',
                relationships: '',
                facebook: '',
                instagram: '',
                linkedin: '',
                twitter: '',
                youtube: '',
            },
            editiedContact: {},
            showMore: false,
            required: false,
            duplicate: false,
            edit: false,
        }

        this.toggleShowMore = this.toggleShowMore.bind(this);
        this.isDuplicateContact = this.isDuplicateContact.bind(this);
        this.isRequired = this.isRequired.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.filterContacts = this.filterContacts.bind(this);
        this.isEditing = this.isEditing.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleWarning = this.handleWarning.bind(this);
        this.selectForm = this.selectForm.bind(this);
        this.editing = this.editing.bind(this);
    }

    initialState = {
        name: '',
        phone: '',
        email: '',
        address: '',
        workInfo: '',
        website: '',
        birthday: '',
        relationships: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        twitter: '',
        youtube: '',
    }

    toggleShowMore() {
        this.state.showMore ? this.setState({showMore: false}) : this.setState({showMore: true});
    }

    editing() {
        this.state.edit ? this.setState({edit: false}) : this.setState({edit: true})
    }
    
    isEditing(editState, editContact) {
        this.setState({edit: editState});
        if (editState) {
            this.setState({
                contact: editContact,
            }, () => {
                this.setState({
                    editiedContact: this.state.contact,
                })
            })
        } else {
            this.setState({
                contact: this.initialState,
            }, () => {
                this.setState({
                    editiedContact: {},
                })
            })
        }
    }

    filterContacts(contactToEdit) {
        if (contactToEdit) {
            return this.props.contacts.filter(contact => contact.name !== contactToEdit.name);
        } else {
            return this.props.contacts;
        }
    }

    handleChange(e, editContact) {
        const value = e.target.value;
        this.setState(prev => ({
            contact: {
                ...prev.contact,
                [e.target.name]: value
            }
        }));
        if (this.isDuplicateContact(value, editContact)) {
            this.setState({duplicate: true});
        } else {
            this.setState({duplicate: false})
        };
    }

    isDuplicateContact(value, editContact) {
        let isDuplicate = false;
        this.filterContacts(editContact).forEach(contact => {
            if (contact.name.toLowerCase() === value.toLowerCase()) {
                isDuplicate = true;
            } 
        })
        return isDuplicate;
    }

    isRequired() {
        const contact = this.state.contact;
        if (!contact.name || !contact.phone || !contact.email) {
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
        if (this.isDuplicateContact(this.state.contact.name, this.state.editiedContact)) {
            this.setState({duplicate: true});
            const timeout = setTimeout(() => {
                this.setState({duplicate: false});
                clearTimeout(timeout)
            }, 5000)
            return true;
        }
        if (this.props.contacts.length > 1 && this.state.editiedContact !== this.state.contact) {
            let newContacts = this.filterContacts(this.state.editiedContact);
            newContacts = [...newContacts, this.state.contact]
            this.props.editContact(newContacts);
        } else if (this.props.contacts.length === 1 && this.state.editiedContact !== this.state.contact) {
            this.props.editContact([this.state.contact])
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.isRequired()) {
            return;
        };
        if (this.isDuplicateContact(this.state.contact.name)) {
            this.setState({duplicate: true});
            const timeout = setTimeout(() => {
                this.setState({duplicate: false});
                clearTimeout(timeout)
            }, 5000)
            return;
        };
        this.setState(prev => ({
            contact: {
                ...prev.contact,
                id: this.props.createId(this.props.contacts)
            }
        }), () => {
            this.props.addContact(this.state.contact);
            this.handleClear(e);
        })       
    }

    handleWarning() {
        this.setState({duplicate: false});
        this.setState({required: false});
    }

    handleClear(e) {
        e.preventDefault();
        Array.from(document.querySelectorAll('#contactForm input')).forEach(input => {
            input.value = '';
        })
        this.setState({
            contact:
            this.initialState
        })
    }

    selectForm(form) {
        const id = this.state.contact.id
        this.setState({
            contact: this.initialState
        }, () => {
            this.setState(prev => ({
                contact: {
                    ...prev.contact,
                    id: id
                }
            }))
        })
        let newForm = document.forms[form];
        let data = new FormData(newForm);

        data.forEach((value, key) => {
            this.setState(prev => ({
                contact: {
                    ...prev.contact,
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
            <div id='contacts'>
                <h2>
                    Contacts
                </h2>

                {this.state.duplicate || this.state.required ? 
                    <div className='warning'>

                    {this.state.required ?
                        <p className='smallPrint'>
                            Name, telephone and e-mail are required.
                        </p>
                        : ''
                    }
                    {this.state.duplicate ?
                        <p className='smallPrint'>
                            Cannot submit a duplicate name.
                        </p>
                        : ''
                    }

                    <button onClick={this.handleWarning} className='warningButton'>OK</button>

                </div> : ''
                }
                
                <div id='contactsSectionWrapper'>
                    <section id='contactAddWrapper'>
                        <ContactForm 
                            onChange={this.handleChange} 
                            toggleShowMore={this.toggleShowMore} 
                            showMore={this.state.showMore}
                            handleClear={this.handleClear}
                            handleSubmit={this.handleSubmit}
                            duplicate={this.state.duplicate}
                            required={this.state.required}
                            edit={this.state.edit}
                            selectForm={this.selectForm}
                        />
                    </section>
                    <section id='contactListWrapper'>
                        <ContactList 
                            contacts={this.props.contacts}
                            deleteContact={this.props.deleteContact}
                            onChange={this.handleChange} 
                            isEditing={this.isEditing}
                            handleEditSubmit={this.handleEditSubmit}
                            duplicate={this.state.duplicate}
                            required={this.state.required}
                            selectForm={this.selectForm}
                            editing={this.editing}
                            edit={this.state.edit}
                            sortByName={this.props.sortByName}
                            birthday={this.props.birthday}
                            dateTime={this.props.dateTime}
                        />
                    </section>
                </div>
            </div>
        )
    }
}

export default Contacts;