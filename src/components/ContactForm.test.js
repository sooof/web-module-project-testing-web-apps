import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
    console.log("inside of test");
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)
    const header = screen.queryByText('Contact Form');

    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent(/Contact Form/i);
    expect(header).not.toBeFalsy();
    
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Soo");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Gate");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "sooof@me.com");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "Hello");

    const button = screen.getByRole("button");
    userEvent.click(button);
    
 });

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)


    const firstNameErr = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstNameErr, "R");

    // const lastNameErr = screen.getByLabelText(/Last Name*/i);
    // userEvent.type(lastNameErr, "");

    const emailErr = screen.getByLabelText(/Email*/i);
    userEvent.type(emailErr, "s");

    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
    // console.log(errorMessages.length)
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);

    const firstName1 = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName1, "sooof");

    const lastName1 = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName1, "Gate");

    const button = screen.getByRole("button");
    userEvent.click(button);
    const errorMessages = await screen.findAllByTestId('error');
    expect(errorMessages).toHaveLength(1);
    console.log("Error ",errorMessages.length)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);


    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "sooof");

    const lastName1 = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName1, "Gate");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "sooof@me");

    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "Hello");

    const button = screen.getByRole("button");
    userEvent.click(button);

    // const errorMessages = await screen.findAllByTestId('error');
    // expect(errorMessages).toHaveLength(1);
    const errorMessage = await screen.findByText(/email must be a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Sooof");

    // const lastName = screen.getByLabelText(/Last Name*/i);
    // userEvent.type(lastName, "Gate");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "sooof@me.com");


    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText(/lastName is a required field/i);
    expect(errorMessage).toBeInTheDocument();

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);


    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Sooof");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Gate");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "sooof@me.com");

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=> {
   
        const messageDisplay = screen.queryByTestId("messageDisplay");


        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(messageDisplay).not.toBeInTheDocument();
    });
    

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const firstName = screen.getByLabelText(/First Name*/i);
    userEvent.type(firstName, "Sooof");

    const lastName = screen.getByLabelText(/Last Name*/i);
    userEvent.type(lastName, "Gate");

    const email = screen.getByLabelText(/Email*/i);
    userEvent.type(email, "sooof@me.com");
  
    const message = screen.getByLabelText(/Message/i);
    userEvent.type(message, "Hello");
    console.log("messageDisplay",message);

    const button = screen.getByRole("button");
    userEvent.click(button);

    await waitFor(()=> {


        expect(firstName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(message).toBeInTheDocument();
    });

});