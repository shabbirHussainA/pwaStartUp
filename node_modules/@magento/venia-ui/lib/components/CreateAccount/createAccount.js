import React from 'react'; // Importing React to use JSX and create components
import { FormattedMessage, useIntl } from 'react-intl'; // Importing internationalization utilities for translating messages
import { Form } from 'informed'; // Importing Form component from 'informed' for form handling and state management
import { func, shape, string, bool } from 'prop-types'; // Importing PropTypes for validating component props
import { useCreateAccount } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount'; // Importing custom hook for managing create account logic

import { useStyle } from '../../classify'; // Importing custom hook for applying styles from CSS modules
import combine from '../../util/combineValidators'; // Importing utility function for combining multiple validation functions
import {
    hasLengthAtLeast,
    isRequired,
    validatePassword
} from '../../util/formValidators'; // Importing common validation functions for form fields
import Button from '../Button'; // Importing Button component for rendering buttons
import Checkbox from '../Checkbox'; // Importing Checkbox component for rendering checkboxes
import Field from '../Field'; // Importing Field component to wrap form fields with labels
import TextInput from '../TextInput'; // Importing TextInput component for text input fields
import defaultClasses from './createAccount.module.css'; // Importing default CSS module styles
import FormError from '../FormError'; // Importing component to display form validation errors
import Password from '../Password'; // Importing Password component for password input fields
import GoogleRecaptcha from '../GoogleReCaptcha'; // Importing Google ReCaptcha component for bot protection

// Define the CreateAccount component
const CreateAccount = props => {
    // Call the useCreateAccount hook to manage form logic and state
    const talonProps = useCreateAccount({
        initialValues: props.initialValues,
        onSubmit: props.onSubmit,
        onCancel: props.onCancel
    });

    // Destructure values and functions from talonProps
    const {
        errors,
        handleCancel,
        handleSubmit,
        handleEnterKeyPress,
        handleCancelKeyPress,
        isDisabled,
        initialValues,
        recaptchaWidgetProps
    } = talonProps;

    // Get the internationalization formatter from useIntl hook
    const { formatMessage } = useIntl();

    // Get CSS class names from the useStyle hook
    const classes = useStyle(defaultClasses, props.classes);

    // Conditionally render the cancel button based on props.isCancelButtonHidden
    const cancelButton = props.isCancelButtonHidden ? null : (
        <Button
            data-cy="CreateAccount-cancelButton" // Custom attribute for testing
            className={classes.cancelButton} // Apply CSS class for cancel button
            disabled={isDisabled} // Disable button if form is disabled
            type="button" // Button type
            priority="low" // Set button priority
            onClick={handleCancel} // Event handler for click
            onKeyDown={handleCancelKeyPress} // Event handler for key down
        >
            <FormattedMessage
                id={'createAccount.cancelText'} // Message ID for translation
                defaultMessage={'Cancel'} // Default message if translation is not available
            />
        </Button>
    );

    // Define the submit button
    const submitButton = (
        <Button
            className={classes.submitButton} // Apply CSS class for submit button
            disabled={isDisabled} // Disable button if form is disabled
            type="submit" // Button type
            priority="high" // Set button priority
            onKeyDown={handleEnterKeyPress} // Event handler for key down
            data-cy="CreateAccount-submitButton" // Custom attribute for testing
        >
            <FormattedMessage
                id={'createAccount.createAccountText'} // Message ID for translation
                defaultMessage={'Create an Account'} // Default message if translation is not available
            />
        </Button>
    );

    // Render the form component
    return (
        <Form
            data-cy="CreateAccount-form" // Custom attribute for testing
            className={classes.root} // Apply CSS class for form
            initialValues={initialValues} // Set initial values for form fields
            onSubmit={handleSubmit} // Event handler for form submit
        >
            <h2 data-cy="CreateAccount-title" className={classes.title}>
                <FormattedMessage
                    id={'createAccount.createAccountText'} // Message ID for translation
                    defaultMessage={'Create an Account'} // Default message if translation is not available
                />
            </h2>
            {/* Display form errors */}
            <FormError errors={Array.from(errors.values())} />

            {/* First Name Field */}
            <Field
                id="firstName" // Field ID
                label={formatMessage({
                    id: 'createAccount.firstNameText', // Message ID for label
                    defaultMessage: 'First Name' // Default label if translation is not available
                })}
            >
                <TextInput
                    id="firstName" // Input ID
                    field="customer.firstname" // Field name for form state
                    autoComplete="given-name" // Input autocomplete attribute
                    validate={isRequired} // Validation function
                    validateOnBlur // Validate on blur
                    mask={value => value && value.trim()} // Mask input value
                    maskOnBlur={true} // Apply mask on blur
                    data-cy="customer-firstname" // Custom attribute for testing
                    aria-label={formatMessage({
                        id: 'global.firstNameRequired', // Message ID for aria-label
                        defaultMessage: 'First Name Required' // Default aria-label if translation is not available
                    })}
                />
            </Field>
            {/* custom attribute */}
            <Field
                id="custom_cust_attribute" // Field ID
                label={formatMessage({
                    id: 'createAccount.customNameText', // Message ID for label
                    defaultMessage: 'custom Name' // Default label if translation is not available
                })}
            >
                <TextInput
                    id="custom_cust_attribute" // Input ID
                    field="customer.custom_cust_attribute" // Field name for form state
                    autoComplete="given-name" // Input autocomplete attribute
                    validate={isRequired} // Validation function
                    validateOnBlur // Validate on blur
                    mask={value => value && value.trim()} // Mask input value
                    maskOnBlur={true} // Apply mask on blur
                    data-cy="customer-custom_cust_attribute" // Custom attribute for testing
                    aria-label={formatMessage({
                        id: 'global.customNameRequired', // Message ID for aria-label
                        defaultMessage: 'custom Name Required' // Default aria-label if translation is not available
                    })}
                />
            </Field>

            {/* Last Name Field */}
            <Field
                id="lastName" // Field ID
                label={formatMessage({
                    id: 'createAccount.lastNameText', // Message ID for label
                    defaultMessage: 'Last Name' // Default label if translation is not available
                })}
            >
                <TextInput
                    id="lastName" // Input ID
                    field="customer.lastname" // Field name for form state
                    autoComplete="family-name" // Input autocomplete attribute
                    validate={isRequired} // Validation function
                    validateOnBlur // Validate on blur
                    mask={value => value && value.trim()} // Mask input value
                    maskOnBlur={true} // Apply mask on blur
                    data-cy="customer-lastname" // Custom attribute for testing
                    aria-label={formatMessage({
                        id: 'global.lastNameRequired', // Message ID for aria-label
                        defaultMessage: 'Last Name Required' // Default aria-label if translation is not available
                    })}
                />
            </Field>

            {/* Email Field */}
            <Field
                id="Email" // Field ID
                label={formatMessage({
                    id: 'createAccount.emailText', // Message ID for label
                    defaultMessage: 'Email' // Default label if translation is not available
                })}
            >
                <TextInput
                    id="Email" // Input ID
                    field="customer.email" // Field name for form state
                    autoComplete="email" // Input autocomplete attribute
                    validate={isRequired} // Validation function
                    validateOnBlur // Validate on blur
                    mask={value => value && value.trim()} // Mask input value
                    maskOnBlur={true} // Apply mask on blur
                    data-cy="customer-email" // Custom attribute for testing
                    aria-label={formatMessage({
                        id: 'global.emailRequired', // Message ID for aria-label
                        defaultMessage: 'Email Required' // Default aria-label if translation is not available
                    })}
                />
            </Field>

            {/* Password Field */}
            <Password
                id="Password" // Field ID
                autoComplete="new-password" // Input autocomplete attribute
                fieldName="password" // Field name for form state
                isToggleButtonHidden={false} // Show or hide the password toggle button
                label={formatMessage({
                    id: 'createAccount.passwordText', // Message ID for label
                    defaultMessage: 'Password' // Default label if translation is not available
                })}
                validate={combine([
                    isRequired, // Ensure password is required
                    [hasLengthAtLeast, 8], // Ensure password has at least 8 characters
                    validatePassword // Additional password validation
                ])}
                validateOnBlur // Validate on blur
                mask={value => value && value.trim()} // Mask input value
                maskOnBlur={true} // Apply mask on blur
                data-cy="password" // Custom attribute for testing
                aria-label={formatMessage({
                    id: 'global.passwordRequired', // Message ID for aria-label
                    defaultMessage: 'Password Required' // Default aria-label if translation is not available
                })}
            />

            {/* Subscribe Checkbox */}
            <div className={classes.subscribe}>
                <Checkbox
                    field="subscribe" // Field name for form state
                    id="subscribe" // Checkbox ID
                    label={formatMessage({
                        id: 'createAccount.subscribeText', // Message ID for label
                        defaultMessage: 'Subscribe to news and updates' // Default label if translation is not available
                    })}
                />
            </div>

            {/* Google ReCaptcha */}
            <GoogleRecaptcha {...recaptchaWidgetProps} />

            {/* Actions: Submit and Cancel Buttons */}
            <div className={classes.actions}>
                {submitButton} // Render submit button
                {cancelButton} // Render cancel button
            </div>
        </Form>
    );
};

// Define prop types for CreateAccount component
CreateAccount.propTypes = {
    classes: shape({
        actions: string, // CSS class for actions container
        lead: string, // CSS class for lead
        root: string, // CSS class for root container
        subscribe: string // CSS class for subscribe container
    }),
    initialValues: shape({
        email: string, // Initial email value
        firstName: string, // Initial first name value
        custom_cust_attribute: string,
        middleName: string, // Initial middle name value
        lastName: string // Initial last name value
    }),
    isCancelButtonHidden: bool, // Flag to hide or show the cancel button
    onSubmit: func, // Function to call on form submit
    onCancel: func // Function to call on cancel
};

// Define default values for props
CreateAccount.defaultProps = {
    onCancel: () => {}, // Default empty function for onCancel
    isCancelButtonHidden: true // Default to hiding the cancel button
};

export default CreateAccount; // Export the CreateAccount component
