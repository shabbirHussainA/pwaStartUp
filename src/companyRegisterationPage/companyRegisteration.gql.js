import { gql } from '@apollo/client';
export const SUBMIT_FORM = gql`
    mutation submitCompanyRegistration($input: companyRegisterationInput!) {
        submitCompanyRegistration(input: $input) {
            success
            message
        }
    }
`;

export const GET_COMPANY_REGISERATION = gql`
    query getCompanyRegisteration {
        getCompanyRegisteration {
            id
            companyname
            openingtime
            closingtime
            employee_number
            manager_contact
        }
    }
`;
export default{
    mutations:{
        setCompanyRegisterationMutation: SUBMIT_FORM,
    },
    queries:{
        getCompanyRegisterationQuery: GET_COMPANY_REGISERATION,
    }
}