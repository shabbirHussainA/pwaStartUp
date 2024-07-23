import React from 'react'
import Field from '@magento/venia-ui/lib/components/Field'
import TextInput from '@magento/venia-ui/lib/components/TextInput'
import { useIntl } from 'react-intl'
function MiddleName({
    isRequired 
}) {
    const { formatMessage } = useIntl();
  return (
    <Field
    id="middleName"
    label={formatMessage({
        id: 'createAccount.middleNameText',
        defaultMessage: 'Middle Name'
    })}
>
    <TextInput
        id="middleName"
        field="customer.middlename"
        autoComplete="additional-name"
        validate={isRequired}
        validateOnBlur
        mask={value => value && value.trim()}
        maskOnBlur={true}
        data-cy="customer-middlename"
        aria-label={formatMessage({
            id: 'global.middleNameRequired',
            defaultMessage: 'Middle Name Required'
        })}
    />
</Field>
  )
}

export default MiddleName
