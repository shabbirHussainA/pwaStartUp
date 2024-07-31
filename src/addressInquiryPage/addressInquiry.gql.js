import { gql } from '@apollo/client';
export const SUBMIT_FORM = gql`
    mutation submitAddressInquiry($input: AddressInquiryInput!) {
        submitAddressInquiry(input: $input) {
            success
            message
        }
    }
`;

export const GET_ADDRESS_INQUIRIES = gql`
    query getAddressInquiries {
        getAddressInquiries {
            id
            postcode
            email
            buildingname
            active
            message
        }
    }
`;
export default{
    mutations:{
        setaddressInquiryMutation: SUBMIT_FORM,
    },
    queries:{
        getaddressInquiryQuery: GET_ADDRESS_INQUIRIES,
    }
}