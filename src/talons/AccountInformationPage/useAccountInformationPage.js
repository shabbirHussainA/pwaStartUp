// this file is handling the queries and mutations for the use
import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const useAccountInformationPage = props => {
    const {
        mutations: {
            setCustomerInformationMutation,
            changeCustomerPasswordMutation
        },
        queries: { getCustomerInformationQuery }
    } = props;

    const [{ isSignedIn }] = useUserContext();//using the userContext to know weather the user is signed in
    const [shouldShowNewPassword, setShouldShowNewPassword] = useState(false);

    const [isUpdateMode, setIsUpdateMode] = useState(false);

    const [, { dispatch }] = useEventingContext();

    // Use local state to determine whether to display errors or not.
    // Could be replaced by a "reset mutation" function from apollo client.
    // https://github.com/apollographql/apollo-feature-requests/issues/170
    const [displayError, setDisplayError] = useState(false);

    const { data: accountInformationData, error: loadDataError } = useQuery(
        getCustomerInformationQuery,
        {
            skip: !isSignedIn,
            fetchPolicy: 'cache-and-network',
            nextFetchPolicy: 'cache-first'
        }
    );// getting the account information from the API
    
    //updating or setting the customer information
    const [
        setCustomerInformation,
        {
            error: customerInformationUpdateError,
            loading: isUpdatingCustomerInformation
        }
    ] = useMutation(setCustomerInformationMutation);
    //mutation to change the customer password
    const [
        changeCustomerPassword,
        {
            error: customerPasswordChangeError,
            loading: isChangingCustomerPassword
        }
    ] = useMutation(changeCustomerPasswordMutation);

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_EDIT',
        formAction: 'editCustomer'
    });

    // const initialValues = useMemo(() => {
    //     if (accountInformationData) {
    //         return { customer: accountInformationData.customer };
    //     }
    // }, [accountInformationData]);

    //setting the value of customcustAttribute from the customAttribute Array
    const initialValues = useMemo(() => {
        if (accountInformationData) {
            const customAttributes = accountInformationData.customer.custom_attributes || [];
            const customCustAttribute = customAttributes.find(attr => attr.code === 'custom_cust_attribute')?.value || '';
            const companyName = customAttributes.find(attr =>attr.code ==='company_name')?.value || "";
            const buildingFloor = customAttributes.find(attr => attr.code ==='building_floor')?.value || "";
            const department = customAttributes.find(attr => attr.code ==='department')?.value || '';
            const mobilePhone = customAttributes.find(attr => attr.code ==='mobile_phone')?.value || '';
            const profession = customAttributes.find(attr => attr.code === 'profession')?.value || '';
            const title = customAttributes.find(attr => attr.code ==='title')?.selected_options.find(option => option.value).value|| '';
            return {
                customer: {
                    ...accountInformationData.customer,
                    custom_cust_attribute: customCustAttribute,
                    company_name:companyName,
                    building_floor:buildingFloor,
                    department:department,
                    mobile_phone:mobilePhone,
                    profession:profession,
                    title:title,

                }
            };
        }
    }, [accountInformationData]);//updating everytime he AccountInformationData changes

    
    const handleChangePassword = useCallback(() => {
        setShouldShowNewPassword(true);
    }, [setShouldShowNewPassword]);//this fuction is used to change password

    const handleCancel = useCallback(() => {
        setIsUpdateMode(false);
        setShouldShowNewPassword(false);
    }, [setIsUpdateMode]); //this function is used to handle cancel

    const showUpdateMode = useCallback(() => {
        setIsUpdateMode(true);

        // If there were errors from removing/updating info, hide them
        // when we open the modal.
        setDisplayError(false);
    }, [setIsUpdateMode]);

    //this function is used to handleSubmit
    const handleSubmit = useCallback(
        async ({ email, firstname, middlename, lastname, password, newPassword, custom_cust_attribute, company_name, building_floor, department, title, mobile_phone, profession}) => {
            try {
                email = email.trim();
                firstname = firstname.trim();
                middlename = middlename.trim();
                lastname = lastname.trim();
                password = password.trim();
                newPassword = newPassword ? newPassword.trim() : newPassword;
                custom_cust_attribute = custom_cust_attribute.trim();
                company_name = company_name.trim();
                building_floor = building_floor.trim();
                department = department.trim();
                title = title.trim();
                mobile_phone = mobile_phone.trim();
                profession = profession.trim();
    //if any of these field changes the setcustomerdata will launch 
                if (
                    initialValues.customer.email !== email ||
                    initialValues.customer.firstname !== firstname ||
                    initialValues.customer.middlename !== middlename ||
                    initialValues.customer.lastname !== lastname ||
                    initialValues.customer.custom_cust_attribute !== custom_cust_attribute ||
                    initialValues.customer.company_name !== company_name ||
                    initialValues.customer.building_floor !== building_floor ||
                    initialValues.customer.department !== department ||
                    initialValues.customer.title !== title ||
                    initialValues.customer.mobile_phone !== mobile_phone ||
                    initialValues.customer.profession !== profession 
                ) {
                    
                    await setCustomerInformation({
                        variables: {//this is input for setting customer information
                            customerInput: {
                                email,
                                firstname,
                                middlename,
                                lastname,
                                password,
                                custom_cust_attribute,
                                company_name,
                                building_floor,
                                department,
                                title,
                                mobile_phone,
                                profession,
                                // custom_attributes: [
                                //     {
                                //         attribute_code: "custom_cust_attribute",
                                //         value: custom_cust_attribute
                                //     }
                                // ]
                            }
                        }
                    });
                }
                if (password && newPassword) {
                    const recaptchaDataForChangeCustomerPassword = await generateReCaptchaData();
                    await changeCustomerPassword({
                        variables: {
                            currentPassword: password,
                            newPassword: newPassword
                        },
                        ...recaptchaDataForChangeCustomerPassword
                    });
                }
    // dispatching the value in the eventing context 
                dispatch({
                    type: 'USER_ACCOUNT_UPDATE',
                    payload: {
                        email,
                        firstName: firstname,
                        middlename: middlename,
                        lastName: lastname,
                        custom_cust_attribute: custom_cust_attribute,
                        company_name: company_name,
                        building_floor: building_floor,
                        department: department,
                        title: title,
                        mobile_phone: mobile_phone,
                        profession: profession

                    }
                });
    
                handleCancel(false);
            } catch {
                setDisplayError(true);
                return;
            }
        },
        [
            initialValues,
            handleCancel,
            setCustomerInformation,
            generateReCaptchaData,
            changeCustomerPassword,
            dispatch
        ]
    );
    

    const errors = displayError
        ? [customerInformationUpdateError, customerPasswordChangeError]
        : []; //displaying error if any

    return {
        handleCancel,
        formErrors: errors,
        handleSubmit,
        handleChangePassword,
        initialValues,
        isDisabled:
            isUpdatingCustomerInformation ||
            isChangingCustomerPassword ||
            recaptchaLoading,
        isUpdateMode,
        loadDataError,
        shouldShowNewPassword,
        showUpdateMode,
        recaptchaWidgetProps
    };
};
