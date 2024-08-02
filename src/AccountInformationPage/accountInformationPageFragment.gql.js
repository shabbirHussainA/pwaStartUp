import { gql } from '@apollo/client';
// this is used to get all the json data from the customer entity 
export const AccountInformationPageFragment = gql`
    fragment AccountInformationPageFragment on Customer {
        id
        firstname
        middlename
        lastname
        email
        custom_cust_attribute
        company_name
        building_floor
        department
        title
        mobile_phone
        profession
        custom_attributes{
            code
            
            ... on AttributeValue{
                value
            }
            ... on AttributeSelectedOptions{
                selected_options{
                    label
                    value
                }
}
        }
  
    }
`;
