import { useCallback, useMemo, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { retrieveCartId } from '@magento/peregrine/lib/store/actions/cart';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';

import DEFAULT_OPERATIONS from './createAccount.gql';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * @param {CreateAccountQueries} props.queries queries used by the talon
 * @param {CreateAccountMutations} props.mutations mutations used by the talon
 * @param {InitialValues} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {Function} props.onCancel the cancel callback
 *
 * @returns {CreateAccountProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useForgotPassword } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js';
 */
export const useCreateAccount = props => {
    const { initialValues = {}, onSubmit, onCancel } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        createAccountMutation,
        createCartMutation,
        getCartDetailsQuery,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation
    } = operations;  //geting all the querry and mutations 
    const apolloClient = useApolloClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext(); //getting cart values and functions from cart context
    const [
        { isGettingDetails },
        { getUserDetails, setToken }
    ] = useUserContext(); //getting user details and values and functions from the usercontext

    const [, { dispatch }] = useEventingContext();// getting eventing context from the useEventingContext

    const [fetchCartId] = useMutation(createCartMutation); // fetching cartid from the API

    const [mergeCarts] = useMutation(mergeCartsMutation);

    // For create account and sign in mutations, we don't want to cache any
    // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.
    const [createAccount, { error: createAccountError }] = useMutation(
        createAccountMutation,
        {
            fetchPolicy: 'no-cache'
        }
    ); //creating Account using the mutation in the backend

    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });//Signing in using the mutation API

    const fetchUserDetails = useAwaitQuery(getCustomerQuery);//fetching the user details
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery); //fetching the cart details

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_CREATE',
        formAction: 'createAccount'
    });

    const handleCancel = useCallback(() => {
        onCancel();
    }, [onCancel]); //function for cancelling createAccount

    const handleCancelKeyPress = useCallback(() => {
        event => {
            if (event.key === 'Enter') {
                handleCancel();
            }
        };
    }, [handleCancel]);
    //this is to handle the submit
    const handleSubmit = useCallback(
        async formValues => {
            setIsSubmitting(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;

                // Get reCaptchaV3 Data for createAccount mutation
                const recaptchaDataForCreateAccount = await generateReCaptchaData();

                // Create the account and then sign in.
                await createAccount({
                    variables: {
                        email: formValues.customer.email,
                        firstname: formValues.customer.firstname,
                        middlename: formValues.customer.middlename,
                        custom_cust_attribute: formValues.customer.custom_cust_attribute,
                        lastname: formValues.customer.lastname,
                        password: formValues.password,
                        is_subscribed: !!formValues.subscribe,
                        company_name: formValues.customer.company_name ,
                        building_floor: formValues.customer.building_floor,
                        department: formValues.customer.department ,
                        title: formValues.customer.title ,
                        mobile_phone:formValues.customer.mobile_phone ,
                        profession: formValues.customer.profession,
                    },
                    ...recaptchaDataForCreateAccount
                });
                //dispatching the values into the eventing context
                dispatch({
                    type: 'USER_CREATE_ACCOUNT',
                    payload: {
                        email: formValues.customer.email,
                        firstName: formValues.customer.firstname,
                        middleName: formValues.customer.middlename,
                        custom_cust_attribute: formValues.customer.custom_cust_attribute,
                        lastName: formValues.customer.lastname,
                        isSubscribed: !!formValues.subscribe,
                        company_name: formValues.customer.company_name ,
                        building_floor: formValues.customer.building_floor,
                        department: formValues.customer.department ,
                        title: formValues.customer.title ,
                        mobile_phone:formValues.customer.mobile_phone ,
                        profession: formValues.customer.profession,
                    }
                });

                // Get reCaptchaV3 Data for signIn mutation
                const recaptchaDataForSignIn = await generateReCaptchaData();
                // signing in and getting the response 
                const signInResponse = await signIn({
                    variables: {
                        email: formValues.customer.email,
                        password: formValues.password
                    },
                    ...recaptchaDataForSignIn
                });
                const token = signInResponse.data.generateCustomerToken.token;
                await setToken(token);

                // Clear all cart/customer data from cache and redux.
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await apolloClient.clearCacheData(apolloClient, 'customer');
                await removeCart();

                // Create and get the customer's cart id.
                await createCart({
                    fetchCartId
                });
                const destinationCartId = await retrieveCartId();

                // Merge the guest cart into the customer cart.
                await mergeCarts({
                    variables: {
                        destinationCartId,
                        sourceCartId
                    }
                });

                // Ensure old stores are updated with any new data.
                await getUserDetails({ fetchUserDetails });
                await getCartDetails({
                    fetchCartId,
                    fetchCartDetails
                });

                // Finally, invoke the post-submission callback.
                if (onSubmit) {
                    onSubmit();
                }
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }
                setIsSubmitting(false);
            }
        },

        [
            cartId,
            generateReCaptchaData,
            createAccount,
            signIn,
            setToken,
            apolloClient,
            removeCart,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            onSubmit,
            dispatch
        ]
    );
    //getting the values from the initialValues provided as props from the createAccount Form
    const sanitizedInitialValues = useMemo(() => {
        const { email, firstName, lastName, middleName, custom_cust_attribute, company_name, building_floor,department ,title ,mobile_phone ,profession, ...rest } = initialValues;

        return {
            customer: { email, firstname: firstName, lastname: lastName,middlename: middleName,custom_cust_attribute: custom_cust_attribute, company_name:company_name, building_floor:building_floor, department:department, title:title, mobile_phone:mobile_phone, profession:profession },
            ...rest
        };
    }, [initialValues]);
//getting error values for create account and signin Mutations
    const errors = useMemo(
        () =>
            new Map([
                ['createAccountQuery', createAccountError],
                ['signInMutation', signInError]
            ]),
        [createAccountError, signInError]
    );

    return {
        errors,
        handleCancel,
        handleSubmit,
        handleCancelKeyPress,
        initialValues: sanitizedInitialValues,
        isDisabled: isSubmitting || isGettingDetails || recaptchaLoading,
        recaptchaWidgetProps
    };
};

/** JSDocs type definitions */

/**
 * GraphQL queries for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountQueries
 *
 * @property {GraphQLAST} customerQuery query to fetch customer details
 * @property {GraphQLAST} getCartDetailsQuery query to get cart details
 */

/**
 * GraphQL mutations for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountMutations
 *
 * @property {GraphQLAST} createAccountMutation mutation for creating new account
 * @property {GraphQLAST} createCartMutation mutation for creating new cart
 * @property {GraphQLAST} mergeCartsMutation mutation for merging carts
 * @property {GraphQLAST} signInMutation mutation for signing
 */

/**
 * Initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} InitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstName first name of the user
 * @property {String} lastName last name of the user
 */

/**
 * Sanitized initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} SanitizedInitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstname first name of the user
 * @property {String} lastname last name of the user
 */

/**
 * Object type returned by the {@link useCreateAccount} talon.
 * It provides props data to use when rendering the create account form component.
 *
 * @typedef {Object} CreateAccountProps
 *
 * @property {Map} errors a map of errors to their respective mutations
 * @property {Function} handleCancel callback function to handle form cancellations
 * @property {Function} handleSubmit callback function to handle form submission
 * @property {SanitizedInitialValues} initialValues initial values for the create account form
 * @property {Boolean} isDisabled true if either details are being fetched or form is being submitted. False otherwise.
 * @property {Object} recaptchaWidgetProps - Props for the GoogleReCaptcha component.
 * @property {Function} recaptchaWidgetProps.containerElement - Container reference callback.
 * @property {Boolean} recaptchaWidgetProps.shouldRender - Checks if component should be rendered.
 */
