import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';

// Write up the two tests here and make sure they are testing what the title shows

test('form header renders', () => {
	render(<CheckoutForm />);
	const header = screen.getByText(/checkout form/i);
	expect(header).toBeInTheDocument();
	expect(header).toBeTruthy();
	expect(header).toHaveTextContent(/checkout form/i);
});

test('form shows success message on submit with form details', async () => {
	render(<CheckoutForm />);
	const firstName = screen.getByLabelText(/first name/i);
	const lastName = screen.getByLabelText(/last name/i);
	const address = screen.getByLabelText(/address/i);
	const city = screen.getByLabelText(/city/i);
	const state = screen.getByLabelText(/state/i);
	const zip = screen.getByLabelText(/zip/i);

	fireEvent.change(firstName, { target: { value: 'Dustin' } });
	fireEvent.change(lastName, { target: { value: 'Myers' } });
	fireEvent.change(address, { target: { value: '505 Ezy St' } });
	fireEvent.change(city, { target: { value: 'New York' } });
	fireEvent.change(state, { target: { value: 'NY' } });
	fireEvent.change(zip, { target: { value: '12345' } });

	expect(firstName).toHaveValue('Dustin');
	expect(lastName).toHaveValue('Myers');
	expect(address).toHaveValue('505 Ezy St');
	expect(city).toHaveValue('New York');
	expect(state).toHaveValue('NY');
	expect(zip).toHaveValue('12345');

	const button = screen.getByRole('button', { name: /checkout/i });
	fireEvent.click(button);

	const newConfirmation = await screen.findByText(/your/i);
	expect(newConfirmation).toBeTruthy();
});
