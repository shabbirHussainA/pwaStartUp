// this includes all the queries and mutation related to customer
import { gql } from '@apollo/client';
import { AccountInformationPageFragment } from './accountInformationPageFragment.gql';

export const SET_CUSTOMER_INFORMATION = gql`
    # mutation SetCustomerInformation($CustomerUpdateInput: customerInput!) {
    #     updateCustomerV2(input: $CustomerUpdateInput) {
        mutation SetCustomerInformation($customerInput: CustomerInput!) {
        updateCustomer(input: $customerInput) {
            # eslint-disable-next-line @graphql-eslint/require-id-when-available
            customer {
                ...AccountInformationPageFragment
            }
            custom_cust_attribute
            
        }
    }
    ${AccountInformationPageFragment}
`;
console.log(SET_CUSTOMER_INFORMATION)
export const CHANGE_CUSTOMER_PASSWORD = gql`
    mutation ChangeCustomerPassword(
        $currentPassword: String!
        $newPassword: String!
    ) {
        changeCustomerPassword(
            currentPassword: $currentPassword
            newPassword: $newPassword # eslint-disable-next-line @graphql-eslint/require-id-when-available
        ) {
            email
        }
    }
`;

export const GET_CUSTOMER_INFORMATION = gql`
    query GetCustomerInformation {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            ...AccountInformationPageFragment
        }
        
    }
    ${AccountInformationPageFragment}
`;

export default {
    mutations: {
        setCustomerInformationMutation: SET_CUSTOMER_INFORMATION,
        changeCustomerPasswordMutation: CHANGE_CUSTOMER_PASSWORD
    },
    queries: {
        getCustomerInformationQuery: GET_CUSTOMER_INFORMATION
    }
};
